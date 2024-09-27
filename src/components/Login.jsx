import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import "../styles/Signup.css";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await axios.post("http://localhost:8080/api/login", { email, password });

      const { authToken } = response.data;

      localStorage.setItem("jwtToken", authToken);

      console.log("User login:", response.data);
      
       // Redirect to the login page
       navigate('/profileForm');
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

 
  return (
    <div className="container">
      <Paper className="paper" sx={{backgroundColor:"#f6f6fc"}}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              id="email-input"
              aria-describedby="email-helper-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="email-helper-text">
              Enter your email.
            </FormHelperText>
          </FormControl>

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Signup;
