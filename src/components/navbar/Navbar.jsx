import React from 'react';
import { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'redux';
import { useNavigate } from 'react-router-dom';
import FLexBetween from 'components/FlexBetween';

const Navbar = () => {
  const [ismobileMenutoggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  //   const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FLexBetween padding="1rem 6%" background={alt}>
      <FLexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25re"
        ></Typography>
      </FLexBetween>
    </FLexBetween>
  );
};

export default Navbar;
