import {
	LOGIN_ACTION_TYPES,
	GET_DATA_ACTION_TYPES,
    GET_CATEGORY_ACTION_TYPES,
} from "../actions/actionTypes";

const {
	LOGIN_REQUEST,
	LOGIN_FULFILLED,
	LOGIN_REJECTED
} = LOGIN_ACTION_TYPES;

const {
	GET_DATA_REQUEST,
	GET_DATA_FULFILLED,
	GET_DATA_REJECTED
} = GET_DATA_ACTION_TYPES;

const {
	GET_CATEGORY_REQUEST,
	GET_CATEGORY_FULFILLED,
} = GET_CATEGORY_ACTION_TYPES;

const initialState = {
    directories: [],
    categories: [],
    error: ''
}

const reducers = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
            return {
                ...state,
                error: false
            }

        case LOGIN_FULFILLED:
            return {
                ...state,
            }

        case LOGIN_REJECTED:
            return {
                ...state,
                error: action.payload
            }

        case GET_DATA_REQUEST:
            return {
                ...state,
            }

        case GET_DATA_FULFILLED:
            return {
                ...state,
                directories: action.payload
            }

        case GET_DATA_REJECTED:
            return {
                ...state,
            }

        case GET_CATEGORY_REQUEST:
            return {
                ...state,
            }

        case GET_CATEGORY_FULFILLED:
            return {
                ...state,
                categories: action.payload
            }

        default:
            return state;
    }
};

export default reducers;