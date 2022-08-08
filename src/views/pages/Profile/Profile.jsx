import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchApi from '../../../libs/FetchApi';
import classes from './Profile.module.scss';
import UpdateUser from './updateUser/UpdateUser';
import reusable from '../../resources/css/Reusable.module.scss';
import { Spinner } from 'react-bootstrap';

const Profile = () => {
	const [user, setUser] = useState();
	const [displayUpdateUser, setDisplayUpdateUser] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const res = await FetchApi.get('/user');

			if (!res.isError) {
				setUser(res.data.user);
			}
			setLoading(false);
		})();
	}, []);

	return (
		<div className={reusable.mainContainer}>
			{loading ? (
				<>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</>
			) : (
				user && (
					<>
						<div className={classes.profileContainer}>
							<div className={classes.username}>
								<p>{user.name[0].toUpperCase()}</p>
							</div>
							<div className={classes.userInfo}>
								<p>
									<strong>Name:</strong> {user.name}
								</p>
								<p>
									<strong>Email:</strong> {user.email}
								</p>
							</div>
							<div className={classes.updateUser}>
								<Button onClick={() => setDisplayUpdateUser(true)}>Update user</Button>
							</div>
							{displayUpdateUser && <UpdateUser setDisplayUpdateUser={setDisplayUpdateUser} />}
						</div>
					</>
				)
			)}
		</div>
	);
};

export default Profile;
