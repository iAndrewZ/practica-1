import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import classes from './UpdateUser.module.scss';
import FetchApi from '../../../../libs/FetchApi';

const UpdateUser = ({ setDisplayUpdateUser }) => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const _handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'email') {
			setEmail(value);
		}
		if (name === 'name') {
			setName(value);
		}

		if (name === 'password') {
			setPassword(value);
		}
	};

	const _updateUser = async () => {
		const payload = {
			...(name.length && { name }),
			...(email.length && { email }),
			...(password.length && { password }),
		};
		const res = await FetchApi.create('/user', payload);
		if (!res.isError) {
			return window.location.reload();
		}
	};

	return (
		<div className={classes.mainContainer}>
			<div className={classes.closeTab}>
				<p onClick={() => setDisplayUpdateUser(false)}>X</p>
			</div>
			<div>
				<Form.Group className='mb-3'>
					<div className={classes.labelContainer}>
						<Form.Label>Email</Form.Label>
					</div>
					<Form.Control name='email' type='email' placeholder='Enter new email' value={email} onChange={_handleChange} />
				</Form.Group>
			</div>
			<div>
				<Form.Group className='mb-3'>
					<div className={classes.labelContainer}>
						<Form.Label>Name</Form.Label>
					</div>
					<Form.Control name='name' type='input' placeholder='Enter a new name' value={name} onChange={_handleChange} />
				</Form.Group>
			</div>
			<div>
				<Form.Group className='mb-3'>
					<div className={classes.labelContainer}>
						<Form.Label>Password</Form.Label>
					</div>
					<Form.Control name='password' type='password' placeholder='Enter a new password' value={password} onChange={_handleChange} />
				</Form.Group>
			</div>
			<div className={classes.updateUserBtnContainer}>
				<Button onClick={_updateUser}>Update user</Button>
			</div>
		</div>
	);
};

export default UpdateUser;
