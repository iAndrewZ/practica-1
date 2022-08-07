import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import classes from './ForgotPassword.module.scss';
import reusable from '../../resources/css/Reusable.module.scss';
import lock from './imgs/reset-password.png';
import FetchApi from '../../../libs/FetchApi';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [errors, setErrors] = useState({
		email: '',
	});

	const navigate = useNavigate();

	const _handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'email') {
			setEmail(value);
		}
		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};
	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!email.length) {
			tmpErrors.email = 'Email field cannot be empty';
			isValid = false;
		}

		setErrors(tmpErrors);
		return isValid;
	};
	const _sendForgotPasswordCode = async () => {
		const isValid = _validate();

		if (isValid) {
			const payload = {
				email,
			};

			const res = await FetchApi.create('/forgot-password', payload);

			if (!res.isError) {
				return navigate('/changepassword');
			}
		}
	};
	return (
		<section className={reusable.mainContainer}>
			<div className={reusable.containerContent}>
				<div className={reusable.formTitle}>
					<h1>Forgot password</h1>
				</div>

				<div className='mb-4 text-center img-container'>
					<img alt='reset password img' width={35} src={lock} />
				</div>

				<div>
					<Form.Group className='mb-3'>
						<Form.Control
							name='email'
							type='input'
							placeholder='Enter email'
							value={email}
							autoFocus={true}
							isInvalid={errors.email.length}
							onChange={_handleChange}
						/>
						{!!errors.email.length && <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>}
					</Form.Group>
				</div>
				<div className={classes.anno}>
					<p className='text-center'>
						<strong>Forgotten your password?</strong>
					</p>
					<div>
						<p>Enter your e-mail address, and we'll send you a code that allow you to reset it.</p>
					</div>
				</div>
				<div className={reusable.btnContainer}>
					<Button onClick={_sendForgotPasswordCode}>Send code</Button>
				</div>
			</div>
		</section>
	);
};

export default ForgotPassword;
