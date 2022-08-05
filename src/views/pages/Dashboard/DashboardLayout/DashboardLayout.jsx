import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../../misc/Sidebar';
import classes from './DashboardLayout.module.scss';

const DashboardLayout = () => {
	return (
		<div className={classes.dashboardLayout}>
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default DashboardLayout;
