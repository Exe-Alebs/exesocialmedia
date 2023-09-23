import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';

const RegisterForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => {
  const { palette } = useTheme();

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name="firstName"
        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
        helperText={touched.firstName && errors.firstName}
        sx={{
          gridColumn: 'span 2',
          marginRight: '5px',
          marginBottom: '5px',
        }}
      />
      <TextField
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name="lastName"
        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
        helperText={touched.lastName && errors.lastName}
        sx={{
          gridColumn: 'span 2',
          marginBottom: '5px',
        }}
      />
      <TextField
        label="Location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.location}
        name="location"
        error={Boolean(touched.location) && Boolean(errors.location)}
        helperText={touched.location && errors.location}
        sx={{
          gridColumn: 'span 2',
          marginRight: '5px',
          marginBottom: '5px',
        }}
      />
      <TextField
        label="Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.occupation}
        name="occupation"
        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
        helperText={touched.occupation && errors.occupation}
        sx={{ gridColumn: 'span 2', marginBottom: '5px' }}
      />
      <Box
        gridColumn="span 4"
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="1rem"
      >
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              <input {...getInputProps()} />
              {!values.picture ? (
                <p>Add Picture Here</p>
              ) : (
                <FlexBetween>
                  <Typography>{values.picture.name}</Typography>
                  <EditOutlinedIcon />
                </FlexBetween>
              )}
            </Box>
          )}
        </Dropzone>
      </Box>
      <Box>
        <TextField
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={Boolean(touched.email) && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          sx={{
            gridColumn: 'span 2',
            marginRight: '5px',
            marginTop: '5px',
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
          sx={{ gridColumn: 'span 4', marginTop: '5px' }}
        />
      </Box>
    </form>
  );
};
export default RegisterForm;
