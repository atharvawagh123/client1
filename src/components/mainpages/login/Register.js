import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Tooltip } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { generateUsername } from './usernameUtils'; // Import the username utility function

const Register = () => {
  const [suggestedUsername, setSuggestedUsername] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[\W_]/, 'Password must contain a special character')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('https://server1-yt76.onrender.com/user/register', values);
        console.log(values);
        localStorage.setItem('firstLogin', 'true');
        window.location.href = "/";
      } catch (err) {
        alert(err.response.data.msg);
      }
    },
  });

  const handleGenerateUsername = () => {
    const newUsername = generateUsername();
    setSuggestedUsername(newUsername);
  };

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(suggestedUsername);
    alert('Username copied to clipboard!');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link to='/login' style={{ textDecoration: 'none', color: '#1976d2' }}>
                Already have an account? Login
              </Link>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Tooltip title="Generate a random username">
                <Button variant="outlined" color="primary" onClick={handleGenerateUsername}>
                  Suggest Username
                </Button>
              </Tooltip>
              {suggestedUsername && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Suggested Username: {suggestedUsername}
                  </Typography>
                  <Button variant="outlined" color="secondary" onClick={handleCopyUsername}>
                    Copy Username
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
