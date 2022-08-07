import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchApi from '../../../../libs/FetchApi';
import classes from './Category.module.scss';
import { Spinner } from 'react-bootstrap';
import reusable from '../../../resources/css/Reusable.module.scss';

const Category = () => {
	const { id } = useParams();
	const [category, setCateogry] = useState('');
	const [error, setError] = useState();
	useEffect(() => {
		(async () => {
			const res = await FetchApi.get(`/category/${id}`);
			if (res.isError) {
				return setError(res.message);
			}
			setCateogry(res.data);
		})();
	}, []);
	return (
		<div className={reusable.mainContainer}>
			{!category && !error ? (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			) : error ? (
				<div>
					<p>{error}</p>
				</div>
			) : (
				<div className={classes.categoryContainer}>
					<p>
						<strong>Category ID:</strong> {category.id}
					</p>
					<p>
						<strong>Name:</strong> {category.name}
					</p>
					<p>
						<strong>Parent id:</strong> {category.parent_id || 'null'}
					</p>
				</div>
			)}
		</div>
	);
};

export default Category;
