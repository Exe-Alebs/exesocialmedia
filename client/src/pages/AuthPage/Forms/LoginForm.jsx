import { TextField } from '@mui/material';

const LoginForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={Boolean(touched.email) && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{
          paddingRight: '5px',
        }}
      />
      <TextField
        label="Password"
        type="password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        name="password"
        error={Boolean(touched.password) && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        sx={{ gridColumn: 'span 2' }}
      />
    </form>
  );
};

export default LoginForm;
