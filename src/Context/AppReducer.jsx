import { ApiTypes, AuthTypes } from "./types";

export default (state, action) => {
	switch (action.type) {
		case ApiTypes.GET_API:
			return {
				...state,
				api: action.payload,
			};

		case AuthTypes.LOGIN:
			return {
				...state,
				auth: action.payload,
			};
		case AuthTypes.LOGOUT:
			return {
				...state,
				auth: {
					isAuth: false,
					userId: null,
					token: null,
          userRole: null,
				},
			};
		default:
			return state;
	}
};
