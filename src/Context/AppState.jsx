import React, { useReducer } from "react";
import { default as AppReducer } from "./AppReducer";
import { AppContext } from "./Context";
import axios from "axios";
import { ApiTypes, AuthTypes } from "./types";

const INITIAL_STATE = {
	auth: {
		isAuth: false,
		userId: null,
		token: null,
		userRole: null,
	},
	api: { parties: [], candidates: [], tables: [], results: [] },
};
const AppState = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

	const getApi = async () => {
		const parties = await axios({
			url: "http://localhost:3002/parties",
			method: "GET",
		});
		const candidates = await axios({
			url: "http://localhost:3002/candidates",
			method: "GET",
		});
		const tables = await axios({
			url: "http://localhost:7777/tables",
			method: "GET",
			headers: {
				Authorization: `Bearer ${state.auth.token}`,
				"Content-Type": "application/json",
			},
		});
		const results = await axios({
			url: "http://localhost:3002/results",
			method: "GET",
		});
		dispatch({
			type: ApiTypes.GET_API,
			payload: {
				parties: parties.data,
				candidates: candidates.data,
				tables: tables.data,
				results: results.data,
			},
		});
	};

	const login = (data) => {
		dispatch({
			type: AuthTypes.LOGIN,
			payload: { isAuth: true, ...data },
		});
	};

	const logout = () => {
		dispatch({
			type: AuthTypes.LOGOUT,
		});
	};

	return (
		<AppContext.Provider
			value={{
				auth: state.auth,
				api: {
					tables: state.api.tables,
					parties: state.api.parties,
					candidates: state.api.candidates,
					results: state.api.results,
				},
				getApi,
				login,
				logout,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppState;
