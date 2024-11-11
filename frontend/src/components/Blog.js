import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
	const navigate = useNavigate();
	const goRouteId = (id) => {
		navigate(`/blogs/${id}`);
	};

	return (
		<>
			<tr
				onClick={() => goRouteId(blog.id)}
				className="hover:cursor-pointer"
			>
				<td className="whitespace-nowrap px-6 py-4">{blog.title}</td>
				<td className="whitespace-nowrap px-6 py-4">{blog.author}</td>
			</tr>
		</>
	);
};

export default Blog;
