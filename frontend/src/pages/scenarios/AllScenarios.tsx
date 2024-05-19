import { Form, Link, useLoaderData } from "react-router-dom";
import ScenarioTable from "../../components/tables/scenario/ScenarioTable";
import { ScenarioType } from "../../types";
import "./AllScenarios.css";

function Scenarios() {
	const scenarios = useLoaderData() as ScenarioType[];

	return (
		<div className="outlet">
			<div className="nav-container">
				<p>All Scenarios</p>
				<div className="btn-group">
					<Link to="/scenarios/add" style={{ background: "var(--color-blue)" }}>
						New Scenario
					</Link>
					<Form method="DELETE">
						<button style={{ background: "var(--color-red)" }} type="submit">
							Delete All
						</button>
					</Form>
				</div>
			</div>
			<ScenarioTable scenarios={scenarios} />
		</div>
	);
}

const loader = async () => {
	const resp = await fetch("/api/scenarios/full");
	const data = await resp.json();
	if (resp.ok) {
		return data;
	} else {
		throw new Error(data.message);
	}
};

const action = async ({ request }: { request: any }) => {
	const formData = await request.formData();
	const scenarioId = formData.get("scenarioId");

	let resp;
	if (scenarioId) {
		resp = await fetch(`/api/scenarios/${scenarioId}`, {
			method: "DELETE",
		});
	} else {
		resp = await fetch("/api/scenarios", {
			method: "DELETE",
		});
	}

	const data = await resp.json();
	if (resp.ok) {
		return null;
	} else {
		throw new Error(data.message);
	}
};

Scenarios.loader = loader;
Scenarios.action = action;
export default Scenarios;
