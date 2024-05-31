import React, { useState } from 'react';
import {
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { EmailField } from './Fields';
import { resetPassword } from './authProvider';

const Component = props => {
  const [msg, setMsg] = useState(false);
  const {
    email,
    setEmail,
    setShowRemember,
    notify
  } = props;

  const handleSubmit = e => {
    e.preventDefault();
    resetPassword({ email }).then(() => {
      setMsg(true);
    }).catch(err => {
      notify(err)
    })
  };

  const handleRemember = () => {
    setShowRemember(false);
  }

  return (
    <Stack direction="column" spacing={3}>
      <EmailField
        email={email}
        setEmail={setEmail}
      />
      {msg &&
        <Typography>
          An email with password reset instructions has been sent to {email}. Please check your spam folder.
        </Typography>
      }
      <Typography>
        Back to Login? <Link style={{ cursor: 'pointer' }} onClick={handleRemember}>Click here</Link>.
      </Typography>
      <LoadingButton
        size="large"
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
      >
        Remember my password
      </LoadingButton>
    </Stack>
  );
};

export default Component;
