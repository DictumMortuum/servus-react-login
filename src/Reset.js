import React, { useState } from 'react';
import { Stack, Box, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSearchParams } from 'react-router-dom';
import { resetPasswordToken } from './authProvider';
import { PasswordField } from './Fields';

const Component = () => {
  const [msg, setMsg] = useState(false);
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    resetPasswordToken({ password, token: searchParams.get("token") }).then(() => {
      setMsg(true);
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <Box sx={{ '.RaLogin-avatar': { visibility: "hidden", margin: 0, height: 0 } }}>
      <Container maxWidth="xs" sx={{ marginTop: 2, marginBottom: 2 }}>
        <Stack direction="column" spacing={3}>
          <PasswordField
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {msg &&
            <Typography>
              Your password has been changed successfully.
            </Typography>
          }
          <LoadingButton
            size="large"
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Reset password
          </LoadingButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Component;
