import React, { useState } from 'react';
import Layout from '../components/layout'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const IndexPage = () => {
  const [username, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleLoginClick = () => {
    // Add your login functionality here
    console.log('Logging in with username:', username);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    const regex = /^[a-z0-9]+$/;
    setUsername(value);
    setIsButtonDisabled(!regex.test(value));
  };


  return (
    <Layout pageTitle="Notes App">
    <div>
      <TextField
        id="username-input"
        label="username"
        helperText="Please enter u username to login, all lowercase, no spaces"
        required
        value={username}
        onChange={handleUsernameChange}
        variant="filled" />
      <br></br><br></br>
      <Button 
        variant="contained"
        id="login-button"
        disabled={isButtonDisabled}
        onClick={handleLoginClick}>
          Login
      </Button>
    </div>
  </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
