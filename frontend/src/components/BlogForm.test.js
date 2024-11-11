/** @format */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

describe("BlogForm component", () => {
	const blog = {
		title: "Test Blog",
		author: "Test Author",
		url: "http://test.com",
	};

	test("calls the event handler with the right details when a new blog is created", async () => {
		const handleBlogSubmit = jest.fn();

		const component = render(
			<BlogForm handleBlogSubmit={handleBlogSubmit} />
		);
		const container = component.container;

		const titleInput = container.querySelector("#blogFormTitle");
		const authorInput = container.querySelector("#blogFormAuthor");
		const urlInput = container.querySelector("#blogFormUrl");
		const form = container.querySelector("#blogForm");

		fireEvent.change(titleInput, {
			target: { value: `${blog.title}` },
		});
		fireEvent.change(authorInput, {
			target: { value: `${blog.author}` },
		});
		fireEvent.change(urlInput, {
			target: { value: `${blog.url}` },
		});
		fireEvent.submit(form);

		expect(handleBlogSubmit.mock.calls).toHaveLength(1);
		expect(handleBlogSubmit.mock.calls[0][0]).toEqual({
			title: "Test Blog",
			author: "Test Author",
			url: "http://test.com",
		});
	});
});
