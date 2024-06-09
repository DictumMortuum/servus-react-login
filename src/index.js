import React, { useState } from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import SignupForm from './Signup';
import LoginForm from './Login';
import Remember from './Remember';
import authProvider from './authProvider';
import SessionAuth from './SessionAuth';
import Reset from './Reset';

const Component = ({ login, signup, checkAuth, notify }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showRemember, setShowRemember] = useState(false);

  return (
    <Box sx={{ '.RaLogin-avatar': { visibility: "hidden", margin: 0, height: 0 } }}>
      <Container maxWidth="xs" sx={{ marginTop: 2, marginBottom: 2 }}>
        {showSignUp &&
          <SignupForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setShowSignUp={setShowSignUp}
            signup={signup}
            notify={notify}
          />
        }
        {!showSignUp && !showRemember &&
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setShowSignUp={setShowSignUp}
            setShowRemember={setShowRemember}
            login={login}
            notify={notify}
            checkAuth={checkAuth}
          />
        }
        {!showSignUp && showRemember &&
          <Remember
            email={email}
            setEmail={setEmail}
            setShowRemember={setShowRemember}
            notify={notify}
          />
        }
      </Container>
    </Box>
  )
}

export default Component;
export {
  SessionAuth,
  authProvider,
  Reset,
}
