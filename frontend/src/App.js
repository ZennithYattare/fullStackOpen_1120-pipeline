/** @format */

import { useEffect, useState } from "react";
import { useDispatchNotification } from "./contexts/NotificationContext";
import { useUser, useDispatchUser } from "./contexts/UserContext";
import { setToken } from "./services/blogs";
import { Routes, Route, Link } from "react-router-dom";

import LoginForm from "./components/Login";
// import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogsList from "./components/BlogsList";
// import BlogForm from "./components/BlogForm";
import BlogPage from "./components/BlogPage";
import Users from "./components/Users";
import UserBlogs from "./components/UserBlogs";

const App = () => {
	const [navBarState, setNavBarState] = useState(false);
	const dispatchNotification = useDispatchNotification();
	const dispatchUser = useDispatchUser();
	const { user } = useUser();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedInUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatchUser({ type: "LOGIN", user: user, token: user.token });
			setToken(user.token);
		}
	}, []);

	const handleLogout = () => {
		window.localStorage.removeItem("loggedInUser");
		dispatchUser({ type: "LOGOUT" });
		dispatchNotification({
			type: "SHOW_NOTIFICATION",
			message: "Logged out successfully!",
			alert: "success",
		});
		setNavBarState(false);
	};

	const navigation = [
		{ title: "Blogs", path: "/" },
		{ title: "Users", path: "/users" },
	];

	return (
		<div>
			<Notification />
			{user === null ? (
				<>
					<LoginForm />
				</>
			) : (
				<>
					<nav className="w-full border-b bg-white md:static md:border-0">
						<div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:px-8">
							<div className="flex items-center justify-between py-3 md:block md:py-5">
								<div className="ml-auto mr-0 md:hidden">
									<button
										className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
										onClick={() =>
											setNavBarState(!navBarState)
										}
									>
										{navBarState ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M4 8h16M4 16h16"
												/>
											</svg>
										)}
									</button>
								</div>
							</div>
							<div
								className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
									navBarState ? "block" : "hidden"
								}`}
							>
								<ul className="mb-2 mt-2 items-center justify-end space-y-8 md:flex md:space-x-6 md:space-y-0">
									{navigation.map((item, idx) => {
										return (
											<li
												key={idx}
												className="grid justify-items-center text-gray-600 hover:text-indigo-600"
											>
												<Link
													className="w-full text-center"
													to={item.path}
												>
													{item.title}
												</Link>
												{navBarState && (
													<div className="hidden md:inline-block">
														<a
															href="javascript:void(0)"
															className="rounded-md bg-indigo-600 px-4 py-3 text-white shadow hover:bg-indigo-700"
														>
															Get Started
														</a>
													</div>
												)}
											</li>
										);
									})}
									<span className="hidden h-6 w-px bg-gray-300 md:block"></span>
									<div className="items-center gap-x-6 space-y-3 md:flex md:space-y-0">
										{user && (
											<>
												<li className="block rounded-lg border py-3 text-center text-gray-700 md:border-none">
													{user.name}
												</li>
												<li>
													<a
														href="javascript:void(0)"
														className="block rounded-lg bg-indigo-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none md:inline"
														id="logoutButton"
														onClick={handleLogout}
													>
														Logout
													</a>
												</li>
											</>
										)}
									</div>
								</ul>
							</div>
						</div>
					</nav>
					{/* <div className="mx-auto max-w-screen-xl px-4 md:px-8">
						<div className="max-w-lg">
							<h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
								Blogs
							</h3>
							{
								<Togglable buttonLabel="Create new blog">
									<BlogForm />
								</Togglable>
							}
						</div>
					</div> */}

					<Routes>
						<Route path="/" element={<BlogsList />} />
						<Route path="/blogs/:id" element={<BlogPage />} />
						<Route path="/users" element={<Users />} />
						<Route path="/users/:id" element={<UserBlogs />} />
					</Routes>
				</>
			)}
		</div>
	);
};

export default App;
