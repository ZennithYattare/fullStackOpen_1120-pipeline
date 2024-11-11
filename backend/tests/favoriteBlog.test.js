/** @format */

const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favorite blog", () => {
	test("of empty list is null", () => {
		expect(favoriteBlog([])).toBe(null);
	});

	test("when list has only one blog equals that blog", () => {
		const blogs = [
			{
				title: "React Native",
				author: "John Doe",
				url: "https://reactnative.com",
				likes: 10,
			},
		];

		expect(favoriteBlog(blogs)).toEqual({
			title: "React Native",
			author: "John Doe",
			likes: 10,
		});
	});

	test("of a bigger list is calculated right", () => {
		const blogs = [
			{
				title: "React Native",
				author: "John Doe",
				url: "https://reactnative.com",
				likes: 10,
			},
			{
				title: "Node.js",
				author: "Jane Smith",
				url: "https://nodejs.org",
				likes: 20,
			},
			{
				title: "MongoDB",
				author: "Bob Johnson",
				url: "https://mongodb.com",
				likes: 30,
			},
		];

		expect(favoriteBlog(blogs)).toEqual({
			title: "MongoDB",
			author: "Bob Johnson",
			likes: 30,
		});
	});

	test("of many top favorites returns one of them", () => {
		const blogs = [
			{
				title: "React Native",
				author: "John Doe",
				url: "https://reactnative.com",
				likes: 30,
			},
			{
				title: "Node.js",
				author: "Jane Smith",
				url: "https://nodejs.org",
				likes: 20,
			},
			{
				title: "MongoDB",
				author: "Bob Johnson",
				url: "https://mongodb.com",
				likes: 30,
			},
		];

		expect(favoriteBlog(blogs)).toEqual(
			expect.objectContaining({
				title: expect.any(String),
				author: expect.any(String),
				likes: 30,
			})
		);
	});
});
