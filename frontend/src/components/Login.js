/** @format */

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import loginService from "../services/login";
import { useDispatchNotification } from "../contexts/NotificationContext";
import { useDispatchUser } from "../contexts/UserContext";
import { setToken } from "../services/blogs";

// * DONE : 7.13 - Refactor to use useReducer-hook and context to manage the data for the logged in user.
const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatchNotification = useDispatchNotification();
	const dispatchUser = useDispatchUser();

	const loginMutation = useMutation({
		mutationFn: loginService.login,
		onSuccess: (user) => {
			dispatchUser({ type: "LOGIN", user: user, token: user.token });
			window.localStorage.setItem("loggedInUser", JSON.stringify(user));
			setToken(user.token);
			setUsername("");
			setPassword("");
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Logged in successfully as ${user.name}`,
				alert: "success",
			});
		},
		onError: () => {
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Wrong credentials",
				alert: "error",
			});
		},
	});

	const handleUsernameChange = ({ target }) => setUsername(target.value);
	const handlePasswordChange = ({ target }) => setPassword(target.value);

	const handleLogin = async (event) => {
		event.preventDefault();
		loginMutation.mutate({ username, password });
	};

	return (
		<main className="w-full h-screen flex flex-col items-center justify-center px-4">
			<div className="max-w-sm w-full text-gray-600">
				<div className="text-center">
					<div className="mt-5 space-y-2">
						<h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
							Log in to your account
						</h3>
					</div>
				</div>
				<form onSubmit={handleLogin} className="mt-8 space-y-5">
					<div>
						<label className="font-medium" htmlFor="username">
							Username
						</label>
						<input
							id="username"
							type="text"
							value={username}
							name="Username"
							onChange={handleUsernameChange}
							required
							className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
						/>
					</div>
					<div>
						<label className="font-medium" htmlFor="password">
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							name="Password"
							onChange={handlePasswordChange}
							required
							className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
						/>
					</div>
					<button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
						Sign in
					</button>
				</form>
			</div>
		</main>
	);
};

export default LoginForm;
