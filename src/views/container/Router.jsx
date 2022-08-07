import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from '../pages/Categories';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import VerifyEmail from '../pages/VerifyEmail';
import ResendVerifyEmail from '../pages/ResendVerifyEmail/ResendVerifyEmail';
import Category from '../pages/Categories/Category/Category';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='verify-email' element={<VerifyEmail />} />
				<Route path='/forgotPassword' element={<ForgotPassword />} />
				<Route path='/changepassword' element={<ChangePassword />} />
				<Route path='/resendVerifyEmail' element={<ResendVerifyEmail />} />
				<Route path='/dashboard' element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='profile' element={<Profile />} />
					<Route path='categories' index element={<Categories />} />
					<Route path='categories/:id' element={<Category />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
