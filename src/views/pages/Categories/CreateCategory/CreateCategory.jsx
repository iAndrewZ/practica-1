import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reusable from '../../../resources/css/Reusable.module.scss';
import classes from './CreateCategory.module.scss';
import { Button, Form } from 'react-bootstrap';
import FetchApi from '../../../../libs/FetchApi';

const CreateCategory = () => {
	const [name, setName] = useState('');
	const [parent_id, setParent_id] = useState('');
	const [errors, setErrors] = useState({
		name: '',
	});

	const navigate = useNavigate();

	const _handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'name') {
			setName(value);
		}

		if (name === 'parent_id') {
			setParent_id(value);
		}
		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!name.length) {
			tmpErrors.name = 'Name field cannot be empty';
			isValid = false;
		}
		setErrors(tmpErrors);
		return isValid;
	};
	const _createCategory = async () => {
		const isValid = _validate();
		if (isValid) {
			const payload = {
				name,
				...(parent_id.length && { parent_id }),
			};
			const res = await FetchApi.create(`/category`, payload);
			console.log(res);
			if (!res.isError) {
				return navigate('/dashboard/categories');
			}
		}
	};
	return (
		<div className={reusable.mainContainer}>
			<div className={reusable.containerContent}>
				<Form.Group className='mb-3'>
					<div className={classes.labelContainer}>
						<Form.Label>Name</Form.Label>
					</div>
					<Form.Control name='name' placeholder='Enter name' value={name} onChange={_handleChange} isInvalid={errors.name.length} />
					{console.log(!!errors.name.length)}
					{!!errors.name.length && <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>}
				</Form.Group>
				<Form.Group className='mb-3'>
					<div className={classes.labelContainer}>
						<Form.Label>Parent_id</Form.Label>
					</div>
					<Form.Control name='parent_id' placeholder='Enter Parent Id' value={parent_id} onChange={_handleChange} />
				</Form.Group>
				<div className={classes.btnContainer}>
					<Button onClick={_createCategory}>Create</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateCategory;
