/** @format */

const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
	test("of empty list is zero", () => {
		expect(totalLikes([])).toBe(0);
	});

	test("when list has only one blog equals the likes of that", () => {
		const blogs = [
			{
				title: "React Native",
				author: "John Doe",
				url: "https://reactnative.com",
				likes: 10,
			},
		];

		expect(totalLikes(blogs)).toBe(10);
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

		expect(totalLikes(blogs)).toBe(60);
	});
});
