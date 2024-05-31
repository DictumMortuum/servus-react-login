import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { checkAuth } from "./authProvider";

const LoginForm = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth({}, false).catch(err => {
      navigate("/auth/login")
    });
  }, [navigate]);

  return (
    <>{children}</>
  );
};

export default LoginForm;
