import React from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const EmailField = ({ email, setEmail }) => {
  return (
    <TextField
      fullWidth
      type="email"
      label="Email Address"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
  )
}

const PasswordField = ({ password, setPassword, showPassword, setShowPassword }) => {
  return (
    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
      label="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export {
  EmailField,
  PasswordField
};
