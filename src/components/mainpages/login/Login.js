import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, CssBaseline } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Login.css';

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
});

const Login = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('/user/login', values);
      localStorage.setItem('firstLogin', 'true');
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.msg || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={6} className="login-paper">
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                helperText="Please enter your email."
              />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                helperText="Please enter your password."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className="login-btn"
              >
                Login
              </Button>
              <Link to="/register" className="register">
                Don't have an account? Register
              </Link>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
