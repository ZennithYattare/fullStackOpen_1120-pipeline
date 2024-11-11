import React, { createContext, useContext, useReducer, useEffect } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SHOW_NOTIFICATION":
			return { message: action.message, alert: action.alert };
		case "HIDE_NOTIFICATION":
			return { message: null, alert: null };
		default:
			return state;
	}
};

export const NotificationProvider = ({ children }) => {
	const [state, dispatch] = useReducer(notificationReducer, {
		message: null,
		alert: null,
	});

	useEffect(() => {
		if (state.message) {
			const timer = setTimeout(() => {
				dispatch({ type: "HIDE_NOTIFICATION" });
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [state.message]);

	return (
		<NotificationContext.Provider value={[state, dispatch]}>
			{children}
		</NotificationContext.Provider>
	);
};

// dispatch[0] is the current state value, and dispatch[1] is the dispatch function itself.
// [state, dispatch]
// It is separated in this case because we want to use the state value in the component that uses the context.
// And we want to use the dispatch function in the hook that we will create.
// This way I can reuse the useDispatchNotification hook in other components such as for voting and creating blogs.
export const useNotification = () => {
	const dispatch = useContext(NotificationContext);
	// console.log("dispatch[0]: ", dispatch);
	return dispatch[0];
};

export const useDispatchNotification = () => {
	const dispatch = useContext(NotificationContext);
	// console.log("dispatch[1]: ", dispatch);
	return dispatch[1];
};

export default NotificationContext;

// The problem with the approach below is that we can only use the dispatch function in the component that uses the context.
// So I can't use it in the Notification component.
// export const useNotification = () => {
// 	const dispatch = useContext(NotificationContext);

// 	const showNotification = (message) => {
// 		dispatch({ type: "SHOW_NOTIFICATION", message });
// 	};

// 	return { showNotification };
// };
