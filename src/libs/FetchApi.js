async function request(url, params = {}, method = 'GET') {
	let endpoint = `${process.env.REACT_APP_API_URL}/api${url}`;

	const options = {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};
	
	const token = window.sessionStorage.getItem('token');

	if(token) { 
		options.headers['Authorization'] = `Bearer ${window.sessionStorage.getItem('token')}`;
	}

	if (method === 'GET') {
		if (Object.keys(params).length) {
			endpoint += `?${objectToQueryString(params)}`;
		}
	} else {
		options.body = JSON.stringify(params);
	}

	try {
		const response = await fetch(endpoint, options);
		const result = await response.json();

		if(!result.status) {
			return generateErrorResponse(result);
		}

		result.isError = false;
		return result;
	} catch (err) {
		return generateErrorResponse(err);
	}
}

function objectToQueryString(obj) {
	return Object.keys(obj)
		.map((key) => `${key}=${obj[key]}`)
		.join('&');
}

function generateErrorResponse(result) {
	return {
		isError: true,
		errors: result.errors,
		message: result.message
	};
}

const get = (url, params) => {
	return request(url, params);
};

const create = (url, params) => {
	return request(url, params, 'POST');
};

const update = (url, params) => {
	return request(url, params, 'PUT');
};

const remove = (url, params) => {
	return request(url, params, 'DELETE');
};



export default {
	get,
	create,
	update,
	remove
};