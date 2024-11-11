import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../services/blogs";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Comments = ({ comments }) => {
	const [commentState, setCommentState] = useState("");
	const id = useParams().id;

	const queryClient = useQueryClient();

	const addCommentMutation = useMutation({
		mutationFn: addComment,
		onSuccess: (data) => {
			queryClient.setQueryData(["blog", data.id], data);
			queryClient.invalidateQueries("blog");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleCommentSubmit = (event) => {
		event.preventDefault();
		addCommentMutation.mutate({ id: id, comment: commentState });
		setCommentState("");
	};

	const handleCommentChange = (event) => {
		setCommentState(event.target.value);
	};

	return (
		<div className="mx-auto mt-6 max-w-screen-xl px-4 md:px-8">
			<div className="max-w-lg">
				<h3 className="mb-2 text-left text-xl font-bold text-gray-800 sm:text-2xl">
					Comments
				</h3>
			</div>
			<div
				data-testid="blogsList"
				className="blog overflow-x-auto rounded-lg border shadow-sm"
			>
				<form onSubmit={handleCommentSubmit}>
					<input
						type="text"
						name="comment"
						placeholder="Comment"
						className="float-left my-2 ml-2 mr-auto rounded-lg border bg-transparent py-2 pl-3 pr-3 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
						value={commentState}
						onChange={handleCommentChange}
					/>
					{commentState.length > 0 ? (
						<button
							id="commentSubmitButton"
							type="submit"
							className="float-right my-2 ml-auto mr-2 rounded-lg border bg-indigo-200 px-4 py-2 text-gray-700 duration-100 hover:border-indigo-600 active:shadow-lg"
						>
							Create
						</button>
					) : (
						<button
							id="commentSubmitButton"
							type="submit"
							className="float-right my-2 ml-auto mr-2 rounded-lg border bg-indigo-100 px-4 py-2 text-gray-100"
							disabled
						>
							Create
						</button>
					)}
				</form>
				<table className="w-full table-auto text-left text-sm">
					<thead className="border-b bg-gray-50 font-medium text-gray-600">
						<tr>
							<th className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody className="divide-y text-gray-600">
						{comments.length > 0 ? (
							<>
								{comments.map((comment) => (
									<tr key={comment.id}>
										<td className="whitespace-nowrap px-6 py-2">
											{comment.content}
										</td>
									</tr>
								))}
							</>
						) : (
							<td className="whitespace-nowrap px-6 py-2">
								No comments yet.
							</td>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Comments;
