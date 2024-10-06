import React from "react";
import {
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { EmailField, PasswordField } from "./Fields";
import { useNavigate } from 'react-router-dom';

const LoginForm = props => {
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    setShowSignUp,
    setShowRemember,
    login,
    checkAuth,
    notify,
    postLogin,
  } = props;

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password }).then(() => {
      checkAuth({}, false).then(() => {
        postLogin();
        navigate('/');
      }).catch(err => {
        console.log(err);
        notify('Invalid email or password')
      });
    }).catch(err => {
      console.log(err);
      notify('Invalid email or password')
    });
  };

  const handleSignUp = () => {
    setShowSignUp(true);
  }

  const handleRemember = () => {
    setShowRemember(true);
  }

  return (
    <Stack direction="column" spacing={3}>
      <EmailField
        email={email}
        setEmail={setEmail}
      />
      <PasswordField
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <Typography>
        Don't have an account? <Link style={{ cursor: 'pointer' }} onClick={handleSignUp}>Sign up</Link>.
      </Typography>
      <Typography>
        Forgotten your password? <Link style={{ cursor: 'pointer' }} onClick={handleRemember}>Click here</Link>.
      </Typography>
      <LoadingButton
        size="large"
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </Stack>
  );
};

export default LoginForm;
