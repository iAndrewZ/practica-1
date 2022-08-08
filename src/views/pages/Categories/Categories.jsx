import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Table } from 'react-bootstrap';
import FetchApi from '../../../libs/FetchApi';
import classes from './Categories.module.scss';
import reusable from '../../resources/css/Reusable.module.scss';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		perPage: 10,
	});
	const navigate = useNavigate();

	const dropDown = useRef();

	useEffect(() => {
		const getCategories = async () => {
			setLoading(true);
			const res = await FetchApi.get('/categories', { page: pagination.currentPage, perPage: pagination.perPage });

			if (!res.isError) {
				const { data: tmpCategories, ...tmpPagination } = res.data;
				setCategories(tmpCategories);
				setPagination(tmpPagination);
			}
			setLoading(false);
		};
		getCategories();
	}, [pagination.currentPage, pagination.perPage]);

	function _handleChangeSelect() {
		setPagination((prev) => ({ ...prev, perPage: dropDown.current.value }));
	}

	const goToPreviousPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
	};

	const goToNextPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
	};

	return (
		<div className={reusable.mainContainer}>
			{loading ? (
				<>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</>
			) : (
				<>
					<div className={classes.dropDown}>
						<label>Categories per page:</label>
						<select ref={dropDown} onChange={_handleChangeSelect} value={pagination.perPage}>
							<option>10</option>
							<option>20</option>
							<option>30</option>
							<option>40</option>
							<option>50</option>
						</select>
					</div>
					<div className={classes.tableContainer}>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Parrent Id</th>
								</tr>
							</thead>
							<tbody>
								{categories?.map((category) => (
									<tr
										key={category.id}
										className={classes.clickrow}
										onClick={() => navigate(`/dashboard/categories/${category.id}`)}
									>
										<td>{category.id}</td>
										<td>{category.name}</td>
										<td>{category.parent_id || '-'}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
					<div className={classes.buttonsContainer}>
						<div className={classes.currentPageContainer}>
							<p>{pagination.currentPage}</p>
						</div>
						<div>
							{pagination.currentPage > 1 && <Button onClick={goToPreviousPage}>Prev</Button>}
							<Button onClick={goToNextPage}>Next</Button>
						</div>
						<div>
							<Button onClick={() => navigate('/dashboard/createcategory')}>Create category</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Categories;
