import React, { useContext } from 'react';
import { useState } from 'react';
import { TextField, Typography, Box, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {

    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
    });

    const [showPassword, setShowPassword]  = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const validateForm = () => {

        const newErrors = {};

        if (!formData.usernameOrEmail.trim()) {
          newErrors.usernameOrEmail = 'Email or Username is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
          }
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return true;
        }

        return false;

      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            return;
        }

        const userCredentials = {
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password
        }

        const res = await fetch('http://localhost:8000/api/login', {

            headers: {    
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userCredentials)
        });

        const data = await res.json();

        if(!res.ok) {

          const newError = { reqError: data.error};
          console.log(data)
          setErrors(newError);
          return;
        }

        setUser(data);
        navigate('/');
        
      };

  return (
    <Container component="main" maxWidth="xs">
      {
        errors?.reqError && <Box marginTop={10} style={{backgroundColor: 'pink'}} >
          <Typography variant='h5' style={{color: 'red', textAlign: 'center'}}>{errors?.reqError}</Typography>
        </Box>
      }
      <Box marginTop={10}>

        <Typography variant="h4" align="center" style={{fontWeight: 'bold', marginBottom: '10px' }}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email or Username"
            name="usernameOrEmail"
            fullWidth
            variant="outlined"
            size='small'
            value={formData.usernameOrEmail}
            onChange={handleChange}
            error={!!errors.usernameOrEmail}
            helperText={errors.usernameOrEmail}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete='off'
            fullWidth
            margin="normal"
            variant="outlined"
            size='small'
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            
            InputProps={{
                
                endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {setShowPassword(!showPassword)}}
                        onMouseDown={(e) => { e.preventDefault(); }}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
    
            }}

          />
          

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Login
          </Button>

        </form>

        <Box marginTop={2} width={300}>
            <Link to='/signup'>
                <Typography style={{ fontSize: '15px', width:'100%'}}>Don't have an account? Sign Up.</Typography>
            </Link>
        </Box> 
        
      </Box>
      
    </Container>
  )
}

export default Login