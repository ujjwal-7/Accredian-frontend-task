import React from 'react';
import { Typography, Container, Box } from '@mui/material';


const Home = ({user}) => {

  return (
    <Container component="main" maxWidth="xs">
      <Box marginTop={10} border={2}>
        <Typography variant='h4' style={{textAlign: 'center'}}>{`Welcome ${user.username}`}</Typography>
      </Box>
        
    </Container>
  )
}

export default Home