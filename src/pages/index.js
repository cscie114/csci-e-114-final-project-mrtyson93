import React, { useState } from 'react';
import Layout from '../components/layout'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const IndexPage = () => {
  const [username, setUsername] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  // When a login is successful, navigate to the notes page
  const handleLoginClick = async () => {
    try {
      const response = await fetch('https://rb6iu28mgb.execute-api.us-east-1.amazonaws.com/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ "user": username }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Just storing the username in localstorage so I can grab it on the notes page
      localStorage.setItem("notesUsername", username);
      window.location.href = '/notes';

    } catch (error) {
      alert('Error during login:' + error);
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    // Making sure input is expected format before login can be done
    const regex = /^[a-z0-9]+$/;
    setUsername(value);
    setIsLoginDisabled(!regex.test(value));
  };

  return (
    <Layout pageTitle="Notes App Login">
    <div>
      <TextField
        id="username-input"
        label="username"
        helperText="Please enter a username to login, all lowercase, no spaces. No sign up necessary."
        required
        value={username}
        onChange={handleUsernameChange}
        variant="filled" />
      <br></br><br></br>
      <Button 
        variant="contained"
        id="login-button"
        disabled={isLoginDisabled}
        onClick={handleLoginClick}>
          Login
      </Button>
    </div>
  </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
