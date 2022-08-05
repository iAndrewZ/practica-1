import React, { useContext } from 'react';
import store from '../../../state/store';
import classes from './Dashboard.module.scss';

const Dashboard = () => {
	const {
		state: { user },
	} = useContext(store);

	return <div className={classes.dashboard}>Dashboard</div>;
};

export default Dashboard;
