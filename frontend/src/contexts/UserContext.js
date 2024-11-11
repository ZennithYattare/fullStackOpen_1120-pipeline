import React, { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				user: action.user,
				token: action.token,
			};
		case "LOGOUT":
			return {
				user: null,
				token: null,
			};
		default:
			return state;
	}
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, {
		user: null,
		token: null,
	});

	return (
		<UserContext.Provider value={[state, dispatch]}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const dispatch = useContext(UserContext);
	return dispatch[0];
};

export const useDispatchUser = () => {
	const dispatch = useContext(UserContext);
	return dispatch[1];
};

export default UserContext;
