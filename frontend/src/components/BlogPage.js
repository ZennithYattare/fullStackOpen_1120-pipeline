import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog } from "../services/blogs";
import { useDispatchNotification } from "../contexts/NotificationContext";
import { update, removeBlog } from "../services/blogs";
import { useUser } from "../contexts/UserContext";
import Comments from "./Comments";

const BlogPage = () => {
	const id = useParams().id;

	const queryClient = useQueryClient();
	const dispatchNotification = useDispatchNotification();
	const { user } = useUser();
	const navigate = useNavigate();

	const {
		data: blog,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["blog", id],
		queryFn: () => getBlog(id),
		retry: 5,
		retryDelay: 1000,
	});

	const updateBlogMutation = useMutation({
		mutationFn: update,
		onSuccess: (data) => {
			queryClient.setQueryData(["blog", data.id], data);
			// I was thinking of commenting out this line of code as it was doing a GET request after updating the number of likes, but it would be better to keep this line of code as it will update the number of likes in the cache.
			queryClient.invalidateQueries("blog");
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Blog "${data.title}" updated successfully!`,
				alert: "success",
			});
		},
		onError: (error) => {
			console.error(error);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Error updating blog",
				alert: "error",
			});
		},
	});

	const handleLike = async (blog) => {
		updateBlogMutation.mutate({
			...blog,
			likes: blog.likes + 1,
		});
	};

	const deleteBlogMutation = useMutation({
		mutationFn: removeBlog,
		onSuccess: (data) => {
			queryClient.removeQueries(["blogs", data.id]);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Blog deleted successfully!",
				alert: "success",
			});
			navigate("/");
		},
		onError: (error) => {
			console.error(error);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Error deleting blog",
				alert: "error",
			});
		},
	});

	const handleBlogDelete = async (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
			deleteBlogMutation.mutate(blog);
		}
	};

	const deleteBlogButton = () => {
		if (user && user.username === blog.user.username) {
			return (
				<button
					id="blogDeleteButton"
					onClick={() => handleBlogDelete(blog)}
					className="ml-auto mr-2 mt-2 rounded-lg border bg-red-200 px-4 py-2 text-gray-700 duration-100 hover:border-indigo-600 active:shadow-lg"
				>
					Delete
				</button>
			);
		}
	};

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
				Blog was not loaded due to problems with the server.{" "}
				<p>Error: {error.message}</p>
			</p>
		);
	}

	const commentContents = blog.comments.map((comment) => comment);
	console.log(commentContents); // ["This is a comment", "Another comment"]

	return (
		<section className="py-14">
			<div className="mx-auto max-w-screen-xl px-4 md:px-8">
				<div className="max-w-xl sm:text-center md:mx-auto">
					<h3 className="text-3xl font-semibold text-gray-800 sm:text-4xl">
						{blog.title}
					</h3>
					<a
						href={blog.url}
						className="mt-2 inline-flex items-center gap-x-1 font-medium text-indigo-600 duration-150 hover:text-indigo-400"
					>
						{blog.url}
					</a>
					<div className="mt-3 items-center justify-center space-y-3 sm:flex sm:space-x-6 sm:space-y-0">
						<a
							href="javascript:void(0)"
							className="block w-full rounded-md bg-indigo-600 px-8 py-3 text-center text-white shadow-md sm:w-auto"
							data-testid="likeButton"
							onClick={() => handleLike(blog)}
						>
							Likes: {blog.likes}
						</a>
					</div>
					<p className="mt-8 text-left text-gray-600">
						Added by: {blog.user.name}
					</p>
					<div className="flex w-full">{deleteBlogButton()}</div>
					<Comments comments={commentContents} />
				</div>
			</div>
		</section>
	);
};

export default BlogPage;
