import * as yup from 'yup';

var requiredString = 'This field is required';

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(requiredString),
  lastName: yup.string().required(requiredString),
  email: yup.string().email('invalid email').required(requiredString),
  password: yup.string().required(requiredString),
  location: yup.string().required(requiredString),
  occupation: yup.string().required(requiredString),
  picture: yup.string().required(requiredString),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required(requiredString),
  password: yup.string().required(requiredString),
});

export const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

export const initialValuesLogin = {
  email: '',
  password: '',
};
