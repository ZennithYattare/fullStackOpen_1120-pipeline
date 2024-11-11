import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../services/blogs";
import { useDispatchNotification } from "../contexts/NotificationContext";

const BlogForm = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const queryClient = useQueryClient();
	const dispatchNotification = useDispatchNotification();

	const createBlogMutation = useMutation({
		mutationFn: create,
		onSuccess: (newBlog) => {
			queryClient.setQueryData(["blogs", newBlog.id], newBlog);
			queryClient.invalidateQueries("blogs");
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Blog "${newBlog.title}" created successfully!`,
				alert: "success",
			});
		},
		onError: (error) => {
			console.error(error);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Error creating blog",
				alert: "error",
			});
		},
	});

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value);
	};

	const handleUrlChange = (event) => {
		setUrl(event.target.value);
	};

	const addBlog = async (event) => {
		event.preventDefault();
		handleBlogSubmit({ title: title, author: author, url: url });

		setTitle("");
		setAuthor("");
		setUrl("");
	};

	const handleBlogSubmit = async (newBlog) => {
		createBlogMutation.mutate(newBlog);
	};

	return (
		<form id="blogForm" onSubmit={addBlog}>
			<div className="relative mt-2 max-w-xs">
				<input
					type="text"
					name="title"
					placeholder="Title"
					className="w-full rounded-lg border bg-transparent py-2 pl-3 pr-3 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
					value={title}
					onChange={handleTitleChange}
					id="blogFormTitle"
				/>
			</div>
			<div className="relative mt-2 max-w-xs">
				<input
					type="text"
					name="author"
					placeholder="Author"
					className="w-full rounded-lg border bg-transparent py-2 pl-3 pr-3 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
					value={author}
					onChange={handleAuthorChange}
					id="blogFormAuthor"
				/>
			</div>
			<div className="relative mt-2 max-w-xs">
				<input
					type="text"
					name="url"
					placeholder="URL"
					className="w-full rounded-lg border bg-transparent py-2 pl-3 pr-3 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
					value={url}
					onChange={handleUrlChange}
					id="blogFormUrl"
				/>
			</div>
			<button
				id="blogFormSubmitButton"
				type="submit"
				className="mt-4 rounded-lg border bg-indigo-200 px-4 py-2 text-gray-700 duration-100 hover:border-indigo-600 active:shadow-lg"
			>
				Create
			</button>
		</form>
	);
};

export default BlogForm;
