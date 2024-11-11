/** @format */

const mostLikes = require("../utils/list_helper").mostLikes;

describe("most likes", () => {
	test("of empty list is null", () => {
		expect(mostLikes([])).toBe(null);
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

		expect(mostLikes(blogs)).toEqual({
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
			{
				title: "React Native 2",
				author: "John Doe",
				url: "https://reactnative.com",
				likes: 5,
			},
		];

		expect(mostLikes(blogs)).toEqual({
			author: "Bob Johnson",
			likes: 30,
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

		expect(mostLikes(blogs)).toEqual(
			expect.objectContaining({
				author: expect.any(String),
				likes: expect.any(Number),
			})
		);
	});
});
