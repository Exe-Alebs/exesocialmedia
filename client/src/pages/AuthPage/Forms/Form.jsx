import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Formik } from 'formik';
import {
  registerSchema,
  loginSchema,
  initialValuesRegister,
  initialValuesLogin,
} from './FormSchema';
import { loginUser, registerUser } from '../authService';

import { setLogin } from 'redux/redux';

const Form = () => {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const initialValues = isLogin ? initialValuesLogin : initialValuesRegister;

  const loginUserSubmit = async (values, onSubmitProps) => {
    try {
      const userData = await loginUser(values);

      onSubmitProps.resetForm();

      if (userData) {
        console.log(userData);
        dispatch(
          setLogin({
            user: userData.user,
            token: userData.token,
          })
        );
        navigate('home');
      }
      onSubmitProps.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const registerUserSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append('picturePath', values.picture.name);
      const userData = await registerUser(formData);

      console.log('Registration successful:', userData);

      if (userData) {
        dispatch(
          setLogin({
            user: userData.user,
            token: userData.token,
          })
        );
        navigate('home');
      }

      onSubmitProps.resetForm();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await loginUserSubmit(values, onSubmitProps);
    if (isRegister) await registerUserSubmit(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          {isRegister ? (
            <RegisterForm
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
          ) : (
            <LoginForm
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}

          <Button
            fullWidth
            type="submit"
            onClick={() => {}}
            sx={{
              mt: '2rem',
              p: '1rem',
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              '&:hover': { color: palette.primary.main },
            }}
          >
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </Button>

          <Typography
            onClick={() => {
              setPageType(isLogin ? 'register' : 'login');
            }}
            sx={{
              mt: '1rem',
              textDecoration: 'underline',
              color: palette.primary.main,
              '&:hover': {
                cursor: 'pointer',
                color: palette.primary.light,
              },
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : 'Already have an account? Login here.'}
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default Form;
