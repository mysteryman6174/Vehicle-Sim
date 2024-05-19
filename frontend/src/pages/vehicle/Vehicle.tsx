import { Form, redirect, useActionData, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { VehicleType } from "../../types";
import "./Vehicles.css";
import { validateData } from "./utils";

type props = {
	mode: "edit" | "add";
};

type loaderType = {
	scenarios: {
		name: string;
		id: string;
	}[];
	vehicle?: VehicleType;
};

function Vehicle({ mode = "add" }: props) {
	const { scenarioId } = useParams();
	const actionData = useActionData() as { errors: { [key: string]: string[] } };
	const loaderData = useLoaderData() as loaderType;
	const navigate = useNavigate();

	function handleReset() {
		(document.getElementById("vehicle") as HTMLFormElement).reset();
	}

	return (
		<main className="outlet">
			<h2>Vehicles / {mode}</h2>
			<div className="scenario-container">
				<p>{mode} Vehicle</p>
				<Form method={mode === "add" ? "POST" : "PATCH"} className="vehicle-form" id="vehicle">
					<label htmlFor="scenario">
						<span>Scenarios List</span>
						<select name="scenarioId" id="scenarioId" required defaultValue={scenarioId}>
							{loaderData.scenarios.map((scenario) => (
								<option key={scenario.id} value={scenario.id}>
									{scenario.name}
								</option>
							))}
						</select>
					</label>
					<label htmlFor="name">
						<span>Vehicle Name</span>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Tagret abc"
							defaultValue={loaderData.vehicle?.name}
							aria-invalid={actionData?.errors?.name?.length > 0}
						/>
						{actionData?.errors?.name?.map((err, idx) => (
							<span className="error" key={idx}>
								{err}
							</span>
						))}
					</label>
					<label htmlFor="speed">
						<span>Speed</span>
						<input
							type="number"
							name="speed"
							id="speed"
							placeholder="10"
							defaultValue={loaderData.vehicle?.speed}
							aria-invalid={actionData?.errors?.speed?.length > 0}
						/>
						{actionData?.errors?.speed?.map((err, idx) => (
							<span className="error" key={idx}>
								{err}
							</span>
						))}
					</label>
					<label htmlFor="posx">
						<span>Position X</span>
						<input
							type="number"
							name="posx"
							id="posx"
							placeholder="10"
							defaultValue={loaderData.vehicle?.posx}
							aria-invalid={actionData?.errors?.posx?.length > 0}
						/>
						{actionData?.errors?.posx?.map((err, idx) => (
							<span className="error" key={idx}>
								{err}
							</span>
						))}
					</label>
					<label htmlFor="posy">
						<span>Position Y</span>
						<input
							type="number"
							name="posy"
							id="posy"
							placeholder="10"
							defaultValue={loaderData.vehicle?.posy}
							aria-invalid={actionData?.errors?.posy?.length > 0}
						/>
						{actionData?.errors?.posy?.map((err, idx) => (
							<span className="error" key={idx}>
								{err}
							</span>
						))}
					</label>
					<label htmlFor="direction">
						<span>Direction</span>
						<select name="direction" id="direction" defaultValue={loaderData.vehicle?.direction}>
							<option value="towards">Towards</option>
							<option value="backwards">Backwards</option>
							<option value="upwards">Upwards</option>
							<option value="downwards">Downwards</option>
						</select>
					</label>
				</Form>
				<div className="button-group">
					<button form="vehicle" style={{ background: "var(--color-green)", textTransform: "capitalize" }}>
						{mode}
					</button>
					<button style={{ background: "var(--color-yellow)", color: "black" }} onClick={handleReset}>
						Reset
					</button>
					<button onClick={() => navigate(-1)} style={{ background: "var(--color-blue)" }}>
						Go Back
					</button>
				</div>
			</div>
		</main>
	);
}

const loader = async ({ params }: { params: any }) => {
	const resp = await fetch("/api/scenarios/minimal");
	const scenarios = await resp.json();
	if (params.vehicleId && params.scenarioId) {
		const resp = await fetch(`/api/scenarios/${params.scenarioId}/vehicles/${params.vehicleId}`);
		if (!resp.ok) {
			throw new Response("Not Found", { status: 404 });
		}
		return { scenarios: scenarios, vehicle: await resp.json() };
	}
	return { scenarios: scenarios };
};

const action = async ({ request, params }: { request: any; params: any }) => {
	const formData = await request.formData();
	const scenarioId = formData.get("scenarioId");
	const name = formData.get("name");
	const speed = Number(formData.get("speed"));
	const posx = Number(formData.get("posx"));
	const posy = Number(formData.get("posy"));
	const direction = formData.get("direction");

	const errors = validateData({ name, speed, posx, posy, direction });
	if (Object.keys(errors).length > 0) {
		return { errors };
	}

	let resp;
	console.log("ALL OK")
	switch (request.method) {
		case "POST":
			resp = await fetch(`/api/scenarios/${scenarioId}/vehicles`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, speed, posx, posy, direction }),
			});
			break;
		case "PATCH":
			resp = await fetch(`/api/scenarios/${scenarioId}/vehicles/${params.vehicleId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, speed, posx, posy, direction }),
			});
			break;
		default:
			throw new Error(`Invalid request method: ${request.method}`);
	}
	const data = await resp.json();

	if (!resp.ok) {
		return data;
	} else {
		return redirect("/scenarios");
	}
};

Vehicle.loader = loader;
Vehicle.action = action;
export default Vehicle;
