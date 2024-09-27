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
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password length
    if (password.length < 5) {
      setPasswordError(true);
      return; // Stop the submission
    }
    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        email,
        password,
      });

      console.log("User registered:", response.data);
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="container">
      <Paper className="paper" sx={{backgroundColor:"#f6f6fc"}}>
        <Typography variant="h5">Signup</Typography>
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
              We'll never share your email.
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
          <FormHelperText style={{ color: "red" }}>
            {passwordError && "Password must be at least 5 characters long."}
          </FormHelperText>

          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Signup
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Signup;
