/** @format */

const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("most blogs", () => {
	test("of empty list is null", () => {
		expect(mostBlogs([])).toBe(null);
	});

	test("when list has only one blog equals that author", () => {
		const blogs = [
			{
				title: "React Native",
				author: "John Doe",
				url: "https://reactnative.com",
				likes: 10,
			},
		];

		expect(mostBlogs(blogs)).toEqual({
			author: "John Doe",
			blogs: 1,
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
			{
				title: "React Native 2",
				author: "John Doe",
				url: "https://reactnative.com",
				likes: 5,
			},
		];

		expect(mostBlogs(blogs)).toEqual({
			author: "John Doe",
			blogs: 2,
		});
	});

	test("of many top bloggers returns one of them", () => {
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
			{
				title: "React Native 2",
				author: "John Doe",
				url: "https://reactnative.com",
				likes: 5,
			},
			{
				title: "Node.js 2",
				author: "Jane Smith",
				url: "https://nodejs.org",
				likes: 15,
			},
		];

		expect(mostBlogs(blogs)).toEqual(
			expect.objectContaining({
				author: expect.any(String),
				blogs: expect.any(Number),
			})
		);
	});
});
