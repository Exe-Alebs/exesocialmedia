import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Form from './Forms/Form';

const AuthPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('min-width: 1000px');

  return (
    <>
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Exe socials
          </Typography>
        </Box>
        <Box
          width={isNonMobileScreens ? '30%' : '93%'}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          flexDirection="column" // Center content vertically
          alignItems="center" // Center content horizontally
        >
          <Typography variant="h6" gutterBottom>
            Welcome to Exe socials
          </Typography>
          <Form />
        </Box>
      </Box>
    </>
  );
};

export default AuthPage;
