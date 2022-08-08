import React, { useState } from 'react';
import FetchApi from '../../../../libs/FetchApi';
import { Button, Form } from 'react-bootstrap';
import classes from './UpdateCategory.module.scss';

const UpdateCategory = ({ id, setDisplayUpdateCategory }) => {
	const [name, setName] = useState('');
	const [parent_id, setParent_id] = useState('');
	const [errors, setErrors] = useState({
		name: '',
	});

	const _handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'name') {
			setName(value);
		}

		if (name === 'parent_id') {
			setParent_id(value);
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

	const _updateCategory = async () => {
		const isValid = _validate();
		if (isValid) {
			const payload = {
				name,
				...(parent_id.length && { parent_id }),
			};
			const res = await FetchApi.update(`/category/${id}`, payload);
			console.log(res);
			if (!res.isError) {
				return window.location.reload();
			}
		}
	};

	return (
		<div className={classes.mainContainer}>
			<div className={classes.closeTab}>
				<p onClick={() => setDisplayUpdateCategory(false)}>X</p>
			</div>
			<Form.Group className='mb-3'>
				<div className={classes.labelContainer}>
					<Form.Label>Name</Form.Label>
				</div>
				<Form.Control name='name' placeholder='Enter name' value={name} onChange={_handleChange} isInvalid={errors.name.length} />
				{!!errors.name.length && <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>}
			</Form.Group>
			<Form.Group className='mb-3'>
				<div className={classes.labelContainer}>
					<Form.Label>Parent_id</Form.Label>
				</div>
				<Form.Control name='parent_id' placeholder='Enter parentID' value={parent_id} onChange={_handleChange} />
			</Form.Group>
			<div className={classes.updateUserBtnContainer}>
				<Button onClick={_updateCategory}>Update</Button>
			</div>
		</div>
	);
};

export default UpdateCategory;
