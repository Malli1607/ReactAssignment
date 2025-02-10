import * as React from 'react';
import { InputLabel, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useRef } from 'react';
import './login.css';

interface LoginResponse {
  message: string;
}

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = React.useState<LoginResponse | null>(null);

  const handleLogin = async () => {
    try {
      
      const email = emailRef.current?.value;
      const passWord = passwordRef.current?.value;

      if (!email || !passWord) {
        console.error("Please fill out both email and password");
        return;
      }

      const payload = {
        email: email,
        password: passWord,
      };
   console.log(payload.email + ", " + payload.password);

      const response = await fetch('http://localhost:3500/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result: LoginResponse = await response.json();
      console.log(result);

      setData(result);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
    <div className='login-container'> 
      <div className="login-header">
        <span className='t1'>Login</span>
        <span className="signup-link">Don't have an account?</span>
      </div>

      <Box component="form" noValidate autoComplete="off">
        <div className="input-group">
          <InputLabel>Email Address</InputLabel>
          <TextField
            id="outlined-size-small"
            variant="outlined"
            inputRef={emailRef}
            size="small"
            className="input-field"
          />
        </div>
      </Box>

      <Box component="form" noValidate autoComplete="off">
        <div className="input-group">
          <InputLabel>Password</InputLabel>
          <TextField
            id="outlined-size-small"
            inputRef={passwordRef}
            size="small"
            type="password"
            className="input-field"
          />
        </div>
      </Box>

      <div className="footer">
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="Keep me signed in"
              labelPlacement="end"
              className="checkbox-label"
            />
          </FormGroup>
        </FormControl>
        <span className="forgot-password">Forgot Password?</span>
      </div>
     <div className="login-button"> 
      <Button variant="contained" className="login-button"  onClick={handleLogin}>
        Login
      </Button>
      </div>

      <Box className="divider-container">
        <Divider className="divider" />
        <Typography variant="body2" className="divider-text">Login with</Typography>
        <Divider className="divider" />
      </Box>

      <div className="social-buttons">
        <Button variant="contained" className="social-button">Google</Button>
        <Button variant="contained" className="social-button">Twitter</Button>
        <Button variant="contained" className="social-button">Facebook</Button>
      </div>
      </div>
    </>
  );
};

export default Login;
