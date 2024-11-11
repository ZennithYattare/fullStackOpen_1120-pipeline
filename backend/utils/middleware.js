/** @format */

const logger = require("./logger");
const jwt = require("jsonwebtoken");
const http = require("http");

const requestLogger = (request, response, next) => {
	const now = new Date();
	const formattedDate = now.toLocaleString();
	logger.info("---");
	logger.info("Time:", formattedDate);
	logger.info("Method:", request.method);
	logger.info("Path:  ", request.path);
	logger.info("Body:  ", request.body);
	const start = Date.now();
	response.on("finish", () => {
		const elapsed = Date.now() - start;
		const message = `${elapsed}ms`;
		logger.info("Response Time: ", message);
		logger.info(
			"Status: ",
			response.statusCode,
			http.STATUS_CODES[response.statusCode]
		);
	});
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "Malformatted ID" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "TokenExpiredError") {
		return response.status(401).json({ error: "token expired" });
	}

	next(error);
};

const tokenExtractor = (request, response, next) => {
	// logger.info(request.get("authorization"));
	const authorization = request.get("authorization");

	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request.token = authorization.substring(7);
	} else {
		request.token = null;
	}

	next();
};

const verifyToken = (request, response, next) => {
	const token = request.token;

	if (!token) {
		return response.status(401).json({ error: "Token missing" });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET);

		request.user = decodedToken;

		next();
	} catch (error) {
		return response.status(401).json({ error: "Token invalid" });
	}
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	verifyToken,
};
