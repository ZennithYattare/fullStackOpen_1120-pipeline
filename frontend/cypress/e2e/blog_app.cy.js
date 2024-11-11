/** @format */

describe("Blog app", () => {
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		cy.visit("");
	});

	it("displays the login form by default", () => {
		cy.contains("Log in to your account");
		cy.get("form").should("contain", "Username");
		cy.get("form").should("contain", "Password");
		cy.get("form").should("contain", "Sign in");
	});

	describe("Login", () => {
		beforeEach(function () {
			cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
			const user = {
				name: "Test User",
				username: "testuser",
				password: "testpassword",
			};
			cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
			cy.visit("");
		});

		it("succeeds with correct credentials", () => {
			cy.get("#username").type("testuser");
			cy.get("#password").type("testpassword");
			cy.get("button").contains("Sign in").click();
			cy.contains("Logged in successfully as Test User");
		});

		it("fails with wrong credentials", () => {
			cy.get("#username").type("testuser");
			cy.get("#password").type("wrongpassword");
			cy.get("button").contains("Sign in").click();
			cy.contains("Wrong credentials");
		});
	});

	describe("When logged in", () => {
		beforeEach(function () {
			cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
			const user = {
				name: "Test User",
				username: "testuser",
				password: "testpassword",
			};
			cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
			cy.visit("");
			cy.get("#username").type("testuser");
			cy.get("#password").type("testpassword");
			cy.get("button").contains("Sign in").click();
			cy.contains("Logged in successfully as Test User");
		});

		it("a new blog can be created", () => {
			cy.wait(5100);
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title");
			cy.get("#blogFormAuthor").type("Test Blog Author");
			cy.get("#blogFormUrl").type("http://testblog.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title");
			cy.contains("Test Blog Author");
		});

		it("a blog can be liked", () => {
			cy.wait(5100);
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title");
			cy.get("#blogFormAuthor").type("Test Blog Author");
			cy.get("#blogFormUrl").type("http://testblog.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title");
			cy.contains("Test Blog Author").click();
			cy.contains("Likes: 0").click();
			cy.contains("Likes: 1");
		});

		it("the user who created a blog can delete it", () => {
			cy.wait(5100);
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title");
			cy.get("#blogFormAuthor").type("Test Blog Author");
			cy.get("#blogFormUrl").type("http://testblog.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title");
			cy.contains("Test Blog Author").click();
			cy.get("#blogDeleteButton").click();
			cy.get("html").should("not.contain", "Test Blog Title");
			cy.get("html").should("not.contain", "Test Blog Author");
		});

		it("only the creator can see the delete button of a blog", () => {
			cy.wait(5100);
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title");
			cy.get("#blogFormAuthor").type("Test Blog Author");
			cy.get("#blogFormUrl").type("http://testblog.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title");
			cy.contains("Test Blog Author").click();
			cy.contains("Delete");
			cy.contains("Logout").click();
			const user2 = {
				name: "Test User 2",
				username: "testuser2",
				password: "testpassword2",
			};
			cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
			cy.get("#username").type("testuser2");
			cy.get("#password").type("testpassword2");
			cy.get("button").contains("Sign in").click();
			cy.contains("Logged in successfully as Test User");
			cy.get("html").should("not.contain", "Delete");
		});

		it("blogs are ordered according to likes", () => {
			cy.wait(5100);
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title 1");
			cy.get("#blogFormAuthor").type("Test Blog Author 1");
			cy.get("#blogFormUrl").type("http://testblog1.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title 1");
			cy.contains("Test Blog Author 1").click();
			cy.contains("Like").click();
			cy.wait(500);
			cy.contains("Like").click();
			cy.wait(500);
			cy.contains("Like").click();
			cy.wait(500);
			cy.contains("Blogs").click();
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title 2");
			cy.get("#blogFormAuthor").type("Test Blog Author 2");
			cy.get("#blogFormUrl").type("http://testblog2.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title 2");
			cy.contains("Test Blog Author 2").click();
			("#blogFormUrl");
			cy.contains("Like").click();
			cy.wait(500);
			cy.contains("Like").click();
			cy.wait(500);
			cy.contains("Blogs").click();
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title 3");
			cy.get("#blogFormAuthor").type("Test Blog Author 3");
			cy.get("#blogFormUrl").type("http://testblog3.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title 3");
			cy.contains("Test Blog Author 3").click();
			cy.contains("Like").click();
			cy.wait(500);
			cy.contains("Blogs").click();
			cy.get("tr")
				.eq(1)
				.should("contain", "Test Blog Title 1")
				.and("contain", "Test Blog Author 1");
			cy.get("tr")
				.eq(2)
				.should("contain", "Test Blog Title 2")
				.and("contain", "Test Blog Author 2");
			cy.get("tr")
				.eq(3)
				.should("contain", "Test Blog Title 3")
				.and("contain", "Test Blog Author 3");
		});
	});
});
