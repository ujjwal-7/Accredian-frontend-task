import React, { useState } from 'react';
import { TextField, Typography, Box, Container, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword]  = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {

        const newErrors = {};
        if (!formData.username.trim()) {
          newErrors.username = 'Username is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
          newErrors.email = 'Enter a valid email address';
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[0-9a-zA-Z!@#$%^&*()-_+=]{8,}$/;

        if (!formData.password.trim() || !passwordRegex.test(formData.password)) {
          newErrors.password = 'Password must be at least 8 characters long and include a digit, lowercase and uppercase letters, and a special character.';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm Password is required';
          }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          }
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return true;
        }

        return false;

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            return;
        }

        const newUser = {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
        
        const res = await fetch('http://localhost:8000/api/signup', {

            headers: {    
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newUser)
        });

        const data = await res.json();

        if(!res.ok) {

          const newError = { reqError: data.error};
          setErrors(newError);
          return;
        }

        navigate('/login');
        
      };

  return (
    <Container component="main" maxWidth="xs">
      {
        errors?.reqError && <Box marginTop={10} style={{backgroundColor: 'pink'}} >
          <Typography variant='h5' style={{color: 'red', textAlign: 'center'}}>{errors?.reqError}</Typography>
        </Box>
      }
      <Box marginTop={10}>
        <Typography variant="h4" align="center" style={{fontWeight: 'bold', marginBottom: '10px'}}>Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            variant="outlined"
            size='small'
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            variant="outlined"
            size='small'
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
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
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete='off'
            fullWidth
            margin='normal'
            variant="outlined"
            size='small'
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Sign Up
          </Button>

        </form>

        <Box marginTop={2} width={230}>
            <Link to='/login'>
                <Typography style={{ fontSize: '15px', width:'100%'}}>Already have an account? Sign in</Typography>
            </Link>
        </Box> 
        
      </Box>
      
    </Container>
  )
}

export default SignUp