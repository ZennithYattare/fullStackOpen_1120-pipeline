/** @format */

const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const likes = blogs.map((blog) => blog.likes);
	const sum = likes.reduce((acc, curr) => acc + curr, 0);
	return sum;
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
	const favorite = blogs.find((blog) => blog.likes === maxLikes);

	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	};
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const authors = _.countBy(blogs, "author");
	const topAuthor = _.maxBy(_.keys(authors), (author) => authors[author]);

	return {
		author: topAuthor,
		blogs: authors[topAuthor],
	};
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const authors = _.groupBy(blogs, "author");
	const likesByAuthor = _.mapValues(authors, (blogs) =>
		_.sumBy(blogs, "likes")
	);
	const topAuthor = _.maxBy(
		_.keys(likesByAuthor),
		(author) => likesByAuthor[author]
	);

	return {
		author: topAuthor,
		likes: likesByAuthor[topAuthor],
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
