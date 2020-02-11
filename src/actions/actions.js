import {
	LOGIN_ACTION_TYPES,
	GET_DATA_ACTION_TYPES,
	SAVE_DATA_ACTION_TYPES,
	SAVE_CATEGORY_ACTION_TYPES,
	GET_CATEGORY_ACTION_TYPES,
	UPDATE_DATA_ACTION_TYPES,
	DELETE_DATA_ACTION_TYPES
} from "./actionTypes";

const {
	LOGIN_REQUEST,
	LOGIN_FULFILLED,
	LOGIN_REJECTED
} = LOGIN_ACTION_TYPES;

const {
	GET_DATA_REQUEST,
	GET_DATA_FULFILLED,
} = GET_DATA_ACTION_TYPES;

const {
	SAVE_DATA_REQUEST,
	SAVE_DATA_FULFILLED,
	SAVE_DATA_REJECTED
} = SAVE_DATA_ACTION_TYPES;

const {
	SAVE_CATEGORY_REQUEST,
	SAVE_CATEGORY_FULFILLED,
	SAVE_CATEGORY_REJECTED
} = SAVE_CATEGORY_ACTION_TYPES;

const {
	GET_CATEGORY_REQUEST,
	GET_CATEGORY_FULFILLED,
} = GET_CATEGORY_ACTION_TYPES;

const {
	UPDATE_DATA_REQUEST,
	UPDATE_DATA_FULFILLED,
	UPDATE_DATA_REJECTED
} = UPDATE_DATA_ACTION_TYPES;

const {
	DELETE_DATA_REQUEST,
	DELETE_DATA_FULFILLED,
} = DELETE_DATA_ACTION_TYPES;

const login = data => {
	return async (dispatch) => {
		dispatch(loginRequest());
		if (data.email === 'admin@email.com' && data.password === '@Password123') {
			localStorage.setItem('token', 'token');
			dispatch(loginFulfilled());
		} else {
			dispatch(loginRejected('error logging in'));
		}
	};
};

const getData = () => {
	return async (dispatch) => {
		dispatch(getDataRequest());
		let result = localStorage.getItem('directories');
		if (result === null) result = [];
		dispatch(getDataFulfilled(result));
	};
};

const saveData = data => {
	return async (dispatch) => {
		dispatch(saveDataRequest());
		if (data) {
			let existingEntries = JSON.parse(localStorage.getItem('directories'));
			if (existingEntries === null) existingEntries = [];
			let entry = {
				"name": data.name,
				"description": data.description,
				"phone": data.phone,
				"email": data.email,
				"website": data.website,
				"imgUrl": data.imgUrl,
				"categorySelected": data.categorySelected
			};
			existingEntries.push(entry);
			localStorage.setItem('directories', JSON.stringify(existingEntries));

			dispatch(saveDataFulfilled());
		} else {
			console.log('error saving to directory')
			dispatch(saveDataRejected());
		}
	};
};

const saveCategory = data => {
	return async (dispatch) => {
		dispatch(saveCategoryRequest());
		if (data) {
			let existingEntries = JSON.parse(localStorage.getItem('categories'));
			if (existingEntries === null) existingEntries = [];
			let entry = {
				"category": data.category,
			};
			existingEntries.push(entry);
			localStorage.setItem('categories', JSON.stringify(existingEntries));

			dispatch(saveCategoryFulfilled());
		} else {
			console.log('error saving to directory')
			dispatch(saveCategoryRejected());
		}
	};
};

const getCategory = () => {
	return async (dispatch) => {
		dispatch(getCategoryRequest());
		let result = localStorage.getItem('categories');
		if (result === null) result = [];
		dispatch(getCategoryFulfilled(result));
	};
};

const updateData = (data, i) => {
	return async (dispatch) => {
		dispatch(updateDataRequest());
		if (data) {
			let existingEntries = JSON.parse(localStorage.getItem('directories'));
			if (existingEntries === null) existingEntries = [];
			let entry = {
				"name": data.name,
				"description": data.description,
				"phone": data.phone,
				"email": data.email,
				"website": data.website,
				"imgUrl": data.imgUrl,
				"categorySelected": data.categorySelected
			};
			existingEntries.reverse()[i] = entry;
			localStorage.setItem('directories', JSON.stringify(existingEntries.reverse()));

			dispatch(updateDataFulfilled());
		} else {
			console.log('error updating directory')
			dispatch(updateDataRejected());
		}
	};
};

const deleteData = data => {
	return async (dispatch) => {
		dispatch(deleteDataRequest());
		let existingEntries = JSON.parse(localStorage.getItem('directories'));
		existingEntries.reverse().splice(data, 1)
		localStorage.setItem('directories', JSON.stringify(existingEntries.reverse()));
		dispatch(deleteDataFulfilled());
	};
};

// ACTION CREATORS

const loginRequest = () => ({
	type: LOGIN_REQUEST,
});

const loginFulfilled = user => ({
	type: LOGIN_FULFILLED,
	payload: user
});

const loginRejected = (data) => ({
	type: LOGIN_REJECTED,
	payload: data
});

const getDataRequest = () => ({
	type: GET_DATA_REQUEST,
});

const getDataFulfilled = (data) => ({
	type: GET_DATA_FULFILLED,
	payload: data
});

const saveDataRequest = () => ({
	type: SAVE_DATA_REQUEST,
});

const saveDataFulfilled = data => ({
	type: SAVE_DATA_FULFILLED,
	payload: data
});

const saveDataRejected = () => ({
	type: SAVE_DATA_REJECTED
});

const saveCategoryRequest = () => ({
	type: SAVE_CATEGORY_REQUEST,
});

const saveCategoryFulfilled = data => ({
	type: SAVE_CATEGORY_FULFILLED,
	payload: data
});

const saveCategoryRejected = () => ({
	type: SAVE_CATEGORY_REJECTED
});

const getCategoryRequest = () => ({
	type: GET_CATEGORY_REQUEST,
});

const getCategoryFulfilled = (data) => ({
	type: GET_CATEGORY_FULFILLED,
	payload: data
});

const updateDataRequest = () => ({
	type: UPDATE_DATA_REQUEST,
});

const updateDataFulfilled = data => ({
	type: UPDATE_DATA_FULFILLED,
	payload: data
});

const updateDataRejected = () => ({
	type: UPDATE_DATA_REJECTED
});

const deleteDataRequest = () => ({
	type: DELETE_DATA_REQUEST,
});

const deleteDataFulfilled = data => ({
	type: DELETE_DATA_FULFILLED,
	payload: data
});

export {
	login,
	getData,
	saveData,
	saveCategory,
	getCategory,
	updateData,
	deleteData
}
