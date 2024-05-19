import { Link, useRouteError } from "react-router-dom";
import "./Error.css";

type Error = {
	data: string;
	statusText: string;
	status: number;
	internal: boolean;
};

export default function Error() {
	const error = useRouteError() as Error;
	return (
		<div className="error-container">
			<div className="terminal">
				<h1>
					Error <span className="errorcode">{error.status}</span>
				</h1>
				<p className="output">{error.data || "Unknown error"}</p>
				<p className="output">
					Please try to <Link to="/">return to the homepage</Link>.
				</p>
				<p className="output">Good luck.</p>
			</div>
		</div>
	);
}
