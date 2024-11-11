// I already have Prettier running in VS Code, so I don't need to run it from the command line.

module.exports = {
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es2021: true,
		jest: true,
		"cypress/globals": true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["react", "jest", "cypress", "react-hooks"],
	rules: {
		indent: "off",
		"linebreak-style": 0,
		quotes: ["error", "double"],
		semi: ["error", "always"],
		eqeqeq: "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": ["error", "always"],
		"arrow-spacing": ["error", { before: true, after: true }],
		"no-console": 0,
		"react/prop-types": 0,
		"react/react-in-jsx-scope": "off",
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
