import * as React from 'react';
import { InputLabel, Box, TextField, Button, Divider, Typography, Checkbox, FormControl, FormControlLabel, FormGroup, Snackbar, Alert } from '@mui/material';
import { FaGoogle, FaTwitter, FaFacebookF } from "react-icons/fa";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './login.css';

interface LoginResponse {
  message: string;
}

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = React.useState<LoginResponse | null>(null);
  const [eText, setEText] = useState(false);
  const [pText, setPText] = useState(false);
  const [sucAlert, setSucAlert] = useState(false);
  const [errAlert, setErrAlert] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const navigate = useNavigate();

  const handleEmailChange = () => {
    if (emailRef.current?.value.trim() !== '') {
      setEText(false);
    }
  };

  const handlePasswordChange = () => {
    if (passwordRef.current?.value.trim() !== '') {
      setPText(false);
    }
  };

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const passWord = passwordRef.current?.value;
  
 
    if (!email || email.trim() === '') {
      setEText(true);
    } else {
      setEText(false);
    }
  
    if (!passWord || passWord.trim() === '') {
      setPText(true);
    } else {
      setPText(false);
    }
  
    
    if (email?.trim() !== '' && passWord?.trim() !== '') {
      const payload = { Email: email, Password: passWord };
      console.log('Payload:', payload);
  
      try {

        console.log("called try1");
         
        const response = await axios.post('http://localhost:5000/api/login', payload);

        console.log("called try2");
  
        console.log('Server response:', response.data);
        // const result = response.data;   

        const statusCode = response.status;
  
        if (statusCode === 200) {
          setSucAlert(true);
          setErrAlert(false);
          setAlertMessage('Login successful!');
          setOpenSnackbar(true);
          setTimeout(() => {
            navigate('/home');
            onLogin();
          }, 2000);
        } else if(statusCode === 400 || statusCode === 400) {
          setSucAlert(false);
          setErrAlert(true);
          setAlertMessage('Incorrect email or password'); 
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setSucAlert(false);
        setErrAlert(true);
        setAlertMessage('Error logging in. Please try again later.');
        setOpenSnackbar(true);
      }
    }
  };
  

  return (
    <div className='main-container'>
      <div className='login-container'>
        <div className="login-header">
          <span className='t1'>LOGIN</span>
          <span className="signup-link">Don't have an account?</span>
        </div>

        <Box component="form" noValidate autoComplete="off" className='inputContainer' sx={{marginBottom:"5px"}}>
          <InputLabel className='label' sx={{ fontSize: "14px" }}>Email Address</InputLabel>
          <TextField
            id="outlined-size-small"
            placeholder="Enter email address"
            variant="outlined"
            inputRef={emailRef}
            size="small"
            className="input-field"
            onChange={handleEmailChange}
            // helperText={eText ? "Please enter your email" : ''}
            error={eText}
          />
        </Box>
        <div style={{fontSize:'10px', marginLeft:'-300px', color:'red'}}>{eText ? "Please enter your email" : ''}</div>
        <Box component="form" noValidate autoComplete="off" className='inputContainer' sx={{marginBottom:"5px"}}>
          <InputLabel className='label' sx={{ fontSize: "14px" }}>Password</InputLabel>
          <TextField
            id="outlined-size-small"
            placeholder="Enter password"
            inputRef={passwordRef}
            size="small"
            type="password"
            className="input-field"
            onChange={handlePasswordChange}
            // helperText={pText ? "Please enter your password" : ''}
            error={pText}
          />
        </Box>
        <div style={{fontSize:'10px', marginLeft:'-280px', color:'red' }}>{pText ? "Please enter your password" : ''}</div>

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
          <Button variant="contained" className="login-button" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </div>

        <Box className="divider-container">
          <Divider className="divider" />
          <Typography variant="body2" className="divider-text">Login with</Typography>
          <Divider className="divider" />
        </Box>

        <div className="social-buttons">
          <Button variant="contained" className="social-button"><span style={{ display: "flex", alignItems: "center" }}><FaGoogle style={{ marginRight: "8px",  color:'white' }} /> <span style={{ marginTop: "2px", color:'white'}}>Google</span> </span></Button>
          <Button variant="contained" className="social-button"><span style={{ display: "flex", alignItems: "center" }}><FaTwitter style={{ marginRight: "8px",  color:'white' }} /> <span style={{ marginTop: "2px" ,  color:'white'}}>Twitter</span> </span></Button>
          <Button variant="contained" className="social-button"><span style={{ display: "flex", alignItems: "center" }}><FaFacebookF style={{ marginRight: "8px" ,  color:'white'}} /> <span style={{ marginTop: "2px",  color:'white' }}>Facebook</span> </span> </Button>
        </div>
      </div>

  <div className='alert'>
  {errAlert && (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  )}
</div>

    </div>
  );
};

export default Login;
