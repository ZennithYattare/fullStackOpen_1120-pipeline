/** @format */

const Blog = require("../models/blog");
const User = require("../models/user");

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

const initialBlogs = [
	{
		title: "First blog post",
		author: "John Doe",
		url: "https://example.com/first-blog-post",
		likes: 10,
	},
	{
		title: "Second blog post",
		author: "Jane Smith",
		url: "https://example.com/second-blog-post",
		likes: 5,
	},
	{
		title: "Third blog post",
		author: "Bob Johnson",
		url: "https://example.com/third-blog-post",
		likes: 15,
	},
	{
		title: "Fourth blog post",
		author: "Alice Williams",
		url: "https://example.com/fourth-blog-post",
		likes: 20,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
	const blog = new Blog({
		title: "willremovethissoon",
		author: "unknown",
		url: "http://localhost:3001/api/blogs",
		likes: 0,
	});
	await blog.save();
	await Blog.findByIdAndDelete(blog._id);

	return blog._id.toString();
};

module.exports = {
	nonExistingId,
	initialBlogs,
	blogsInDb,
	usersInDb,
};
