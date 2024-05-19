import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Simulator from "../../components/simualtor/Simulator";
import VehiclesTable from "../../components/tables/vehicles/VehiclesTable";
import { ScenarioType } from "../../types";
import "./Home.css";

function Home() {
	const loaderData = useLoaderData() as ScenarioType[];
	const [scenario, setScenario] = useState<number>(0);

	return (
		<main className="outlet home-main">
			<label htmlFor="scenario">
				<select
					name="scenario"
					id="scenario"
					className="scenario-select"
					defaultValue={scenario}
					onChange={(e) => setScenario(Number(e.target.value))}>
					{loaderData.map((scenario, index) => (
						<option value={index} key={scenario.id}>
							{scenario.name}
						</option>
					))}
				</select>
			</label>
			<VehiclesTable vehicles={loaderData[scenario].vehicles} scenarioId={loaderData[scenario].id} />
			<Simulator vehicles={loaderData[scenario].vehicles} duration={loaderData[scenario].time} />
		</main>
	);
}

const action = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const vehicleId = formData.get("vehicleId");
	const scenarioId = formData.get("scenarioId");

	const resp = await fetch(`/api/scenarios/${scenarioId}/vehicles/${vehicleId}`, {
		method: "DELETE",
	});

	const data = await resp.json();
	if (resp.ok) {
		return null;
	} else {
		throw new Error(data.message);
	}
};

Home.action = action;
export default Home;
