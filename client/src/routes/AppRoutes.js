import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/home/Home';
import Login from 'pages/AuthPage/authPage';
import Profile from 'pages/profile/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile/:userId" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
