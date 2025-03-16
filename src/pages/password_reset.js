import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { backend_url } from "../App";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../reusable_components/site_data/siteDataSlice";

export default function NewPassword() {
  const { uid, token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      await axios.post(`${backend_url}/accounts/api/reset-password-confirm/`, {
        uid,
        token,
        new_password: password,
      });
      setSuccess(true);
      setError(null);
      dispatch(setSnackBar("Reset password link sent successfully!"));
      setTimeout(() => history.push("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" fontWeight="bold" mb={2}>Reset Password</Typography>
        {success ? (
          <Alert severity="success">Password reset successful! Redirecting...</Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Reset Password
            </Button>
          </form>
        )}
        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => history.push("/")}
        >
          Back to Login
        </Button>
      </Box>
    </Container>
  );
}
