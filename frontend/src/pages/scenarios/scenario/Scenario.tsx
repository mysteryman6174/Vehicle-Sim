import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { ScenarioType } from "../../../types";
import "./Scenario.css";

function Scenario({ mode = "add" }: { mode: "add" | "edit" }) {
	const navigate = useNavigate();
	const loaderData = useLoaderData() as Partial<ScenarioType>;
	const actionData = useActionData() as { errors: { [key: string]: string[] } };

	function handleReset() {
		(document.getElementById("scenario") as HTMLFormElement).reset();
	}

	return (
		<main className="outlet">
			<h2>Scenario / {mode}</h2>
			<div className="scenario-container">
				<p>{mode} Scenario</p>
				<Form method={mode === "add" ? "POST" : "PATCH"} className="scenario-form" id="scenario">
					<label htmlFor="name">
						<span>Scenario Name</span>
						<input
							aria-invalid={actionData?.errors?.name?.length > 0}
							type="text"
							name="name"
							defaultValue={loaderData?.name}
							id="name"
							placeholder="Test Scenario"
						/>
						{actionData?.errors?.name?.map((err, idx) => (
							<span className="error" key={idx}>
								{err}
							</span>
						))}
					</label>
					<label htmlFor="time">
						<span>Scenario Time (seconds)</span>
						<input
							type="number"
							name="time"
							id="time"
							defaultValue={loaderData?.time}
							placeholder="10"
							aria-invalid={actionData?.errors?.time?.length > 0}
						/>
						{actionData?.errors?.time?.map((err, idx) => (
							<span className="error" key={idx}>
								{err}
							</span>
						))}
					</label>
				</Form>
				<div className="button-group">
					<button form="scenario" style={{ background: "var(--color-green)", textTransform: "capitalize" }}>
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
	const resp = await fetch(`/api/scenarios/${params.scenarioId}`);
	const data = await resp.json();
	if (resp.status === 404) {
		throw new Response(data.message, { status: 404 });
	}
	return data;
};

const action = async ({ request, params }: { request: any; params: any }) => {
	const formData = await request.formData();
	const name = formData.get("name");
	const time = Number(formData.get("time"));
	const errors: { [key: string]: string[] } = {};

	if (!name || name.length === 0) {
		errors.name = ["Name is Required"];
	}
	if (time === undefined) {
		errors.time = ["Time is Required"];
	} else if (time === 0) {
		errors.time = ["Time must be greater than 0"];
	}

	if (Object.keys(errors).length > 0) {
		return { errors };
	}

	let resp;
	if (request.method === "POST") {
		resp = await fetch("/api/scenarios", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, time }),
		});
	} else {
		resp = await fetch(`/api/scenarios/${params.scenarioId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, time }),
		});
	}

	if (resp.ok) {
		return redirect("/scenarios");
	} else {
		return { errors: resp.json() };
	}
};

Scenario.loader = loader;
Scenario.action = action;
export default Scenario;
