const express = require("express");
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");

const commentsRouter = express.Router();

commentsRouter.post(
	"/:id/comments",
	middleware.tokenExtractor,
	middleware.verifyToken,
	async (request, response) => {
		const body = request.body;

		if (!body.comment) {
			return response.status(400).json({ error: "content missing" });
		}

		const decodedToken = jwt.verify(request.token, process.env.SECRET);

		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}

		const blog = await Blog.findById(request.params.id);

		if (!blog) {
			return response.status(404).json({ error: "Blog not found" });
		}

		const comment = new Comment({
			content: body.comment,
			blog: blog._id,
		});

		try {
			const savedComment = await comment.save();
			blog.comments = blog.comments.concat(savedComment._id);
			await blog.save();
			response.status(201).json(savedComment.toJSON());
		} catch (error) {
			response.status(400).json({ error: error.message });
		}
	}
);

module.exports = commentsRouter;
