/** @format */

import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div>
			<div style={hideWhenVisible}>
				<button
					onClick={toggleVisibility}
					className="rounded-lg border px-4 py-2 text-gray-700 duration-100 hover:border-indigo-600 active:shadow-lg"
				>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button
					onClick={toggleVisibility}
					className="mt-2 rounded-lg border bg-red-200 px-4 py-2 text-gray-700 duration-100 hover:border-indigo-600 active:shadow-lg"
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
