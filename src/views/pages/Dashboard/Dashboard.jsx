import React, { useContext } from 'react';
import Sidebar from '../../../misc/Sidebar';
import store from '../../../state/store';
import classes from './Dashboard.module.scss';
const Dashboard = () => {
	const {
		state: { user },
	} = useContext(store);

	console.log({ user });
	return <div className={classes.dashboard}>Dashboard</div>;
};

export default Dashboard;
