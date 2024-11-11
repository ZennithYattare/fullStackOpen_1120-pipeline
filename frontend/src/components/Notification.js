/** @format */
import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
	const { message, alert } = useNotification();

	if (message === null) {
		return null;
	}

	const Success = () => {
		return (
			<div className="absolute mx-4 mt-12 rounded-md border-l-4 border-green-500 bg-green-50 px-4 md:max-w-2xl md:px-8">
				<div className="flex justify-between py-3">
					<div className="flex">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 rounded-full text-green-500"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3 self-center">
							<span className="font-semibold text-green-600">
								Success
							</span>
							<p className="mt-1 text-green-600">{message}</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const Error = () => {
		return (
			<div className="absolute mx-4 mt-12 rounded-md border-l-4 border-red-500 bg-red-50 px-4 md:max-w-2xl md:px-8">
				<div className="flex justify-between py-3">
					<div className="flex">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-red-500"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3 self-center">
							<span className="font-semibold text-red-600">
								Error
							</span>
							<p className="mt-1 text-red-600">{message}</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return alert === "error" ? <Error /> : <Success />;
};

export default Notification;
