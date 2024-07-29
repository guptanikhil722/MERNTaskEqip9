import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';
import HomePage from '../screens/HomePage';
import Header from '../components/Header';
import { AuthProvider } from '../contexts/userAuth';
import { ProtectedRoute } from '../contexts/protectedRoute';
const RouteNav = () => (

  <BrowserRouter>
    <Header />
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
    </Routes>
    </AuthProvider>
  </BrowserRouter>

);

export default RouteNav;