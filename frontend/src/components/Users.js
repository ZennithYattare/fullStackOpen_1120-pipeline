// *DONE 7.14: Users view - Implement a view to the application that displays all of the basic information related to users.

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";
import { Link } from "react-router-dom";

const Users = () => {
	const {
		data: users,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
		retry: 5,
		retryDelay: 1000,
	});

	if (isLoading) {
		return (
			<div
				aria-label="Loading..."
				role="status"
				className="flex h-screen w-screen items-center space-x-2"
			>
				<div className="mx-auto">
					<div aria-label="Loading..." role="status">
						<svg
							className="h-12 w-12 animate-spin"
							viewBox="3 3 18 18"
						>
							<path
								className="fill-gray-200"
								d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
							></path>
							<path
								className="fill-gray-800"
								d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
							></path>
						</svg>
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<p>
				Users were not loaded due to problems with the server.{" "}
				<p>Error: {error.message}</p>
			</p>
		);
	}

	return (
		<div className="mx-auto max-w-screen-xl px-4 md:px-8">
			<div className="max-w-lg">
				<h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
					Users
				</h3>
			</div>
			<div
				data-testid="blogsList"
				className="blog mt-12 overflow-x-auto rounded-lg border shadow-sm"
			>
				<table className="w-full table-auto text-left text-sm">
					<thead className="border-b bg-gray-50 font-medium text-gray-600">
						<tr>
							<th className="px-6 py-3">Author</th>
							<th className="px-6 py-3">Blogs Created</th>
						</tr>
					</thead>
					<tbody className="divide-y text-gray-600">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="whitespace-nowrap px-6 py-4">
									<Link to={`/users/${user.id}`}>
										{user.name}
									</Link>
								</td>
								<td>{user.blogs.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
