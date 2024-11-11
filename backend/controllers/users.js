/** @format */

const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs", {
		user: 0,
	});
	response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
	console.log("request.params.id: ", request.params.id);
	const user = await User.findById(request.params.id).populate("blogs", {
		user: 0,
	});

	console.log(user);

	if (user) {
		response.json(user);
	} else {
		response.status(404).end();
	}
});

usersRouter.post("/", async (request, response) => {
	const { username, name, password } = request.body;

	if (!username || !password) {
		return response
			.status(400)
			.json({ error: "username and password are required" });
	}

	if (username.length < 3 || password.length < 3) {
		return response.status(400).json({
			error: "username and password must be at least 3 characters long",
		});
	}

	const existingUser = await User.findOne({ username: username });

	if (existingUser) {
		return response.status(400).json({ error: "username must be unique" });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

module.exports = usersRouter;
