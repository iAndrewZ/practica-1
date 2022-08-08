import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FetchApi from '../../../../libs/FetchApi';
import classes from './Category.module.scss';
import { Button, Spinner } from 'react-bootstrap';
import reusable from '../../../resources/css/Reusable.module.scss';
import UpdateCategory from '../updateCategory/UpdateCategory';

const Category = () => {
	const { id } = useParams();
	const [category, setCateogry] = useState('');
	const [displayUpdateCategory, setDisplayUpdateCategory] = useState(false);
	const [error, setError] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			const res = await FetchApi.get(`/category/${id}`);
			if (res.isError) {
				return setError(res.message);
			}
			setCateogry(res.data);
		})();
	}, []);
	const deleteCategory = async () => {
		const res = await FetchApi.remove(`/category/${id}`);
		if (res.isError) {
			return setError(res.message);
		}
		return navigate('/dashboard/categories');
	};
	return (
		<div className={classes.mainContainer}>
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
					<div className={classes.btns}>
						<Button onClick={deleteCategory}>Delete</Button>
						<Button onClick={() => setDisplayUpdateCategory(true)}>Update</Button>
					</div>
					{displayUpdateCategory && <UpdateCategory id={id} setDisplayUpdateCategory={setDisplayUpdateCategory} />}
				</div>
			)}
		</div>
	);
};

export default Category;
