/** @format */

const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");
const Comment = require("../models/comment");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { blogs: 0 });
	response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id)
		.populate("user", {
			blogs: 0,
		})
		.populate("comments", { content: 1 });
	response.json(blog);
});

// Added the following middleware to the route handler for the HTTP POST request to the /api/blogs endpoint as using it in the app.js as using the following:
// app.use(middleware.tokenExtractor)
// app.use(middleware.verifyToken)
// app.use('/api/blogs', middleware.verifyToken, blogsRouter)
// applied to the GET route which does not need authentication to see all the blogs.
blogsRouter.post(
	"/",
	middleware.tokenExtractor,
	middleware.verifyToken,
	async (request, response) => {
		const body = request.body;
		const decodedToken = jwt.verify(request.token, process.env.SECRET);

		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}
		const user = await User.findById(decodedToken.id);

		if (!body.title || !body.url) {
			return response.status(400).json({ error: "title or url missing" });
		}

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
			user: user._id,
		});

		await blog.populate("user", { blogs: 0 });
		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		response.status(201).json(savedBlog.toJSON());
	}
);

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const blog = {
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	}).populate("user", { username: 1, name: 1 });

	response.json(updatedBlog.toJSON());
});

blogsRouter.delete(
	"/:id",
	middleware.tokenExtractor,
	middleware.verifyToken,
	async (request, response) => {
		const decodedToken = jwt.verify(request.token, process.env.SECRET);

		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}

		const blog = await Blog.findById(request.params.id);

		if (!blog) {
			return response.status(404).json({ error: "blog not found" });
		}

		if (!blog.user || blog.user.toString() !== decodedToken.id.toString()) {
			return response
				.status(401)
				.json({ error: "not authorized to delete this blog" });
		}

		const user = await User.findById(decodedToken.id);
		user.blogs = user.blogs.filter(
			(b) => b.toString() !== blog._id.toString()
		);
		await user.save();

		// Delete comments associated with the blog
		await Comment.deleteMany({ blog: blog._id });

		await Blog.findByIdAndRemove(request.params.id);

		response.status(204).end();
	}
);

// export
module.exports = blogsRouter;
