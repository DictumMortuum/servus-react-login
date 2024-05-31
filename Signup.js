import React from "react";
import {
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { EmailField, PasswordField } from "./Fields";
import { useNavigate } from 'react-router-dom';

const SignupForm = props => {
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    setShowSignUp,
    notify,
    signup
  } = props;

  const handleSubmit = e => {
    e.preventDefault();
    signup({ email, password })
    .then(() => {
      navigate('/')
    })
    .catch(() => {
      notify('Invalid email or password')
    });
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
      <Typography>Already have an account? <Link style={{ cursor: 'pointer' }} onClick={() => setShowSignUp(false) }>Sign in</Link>.</Typography>
      <LoadingButton
        size="large"
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
      >
        Sign Up
      </LoadingButton>
    </Stack>
  );
};

export default SignupForm;
