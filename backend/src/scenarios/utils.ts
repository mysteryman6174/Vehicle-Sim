import ApiError from "../apiError";
import db, { ScenarioType } from "../database";

const emptyRegex = /^\s*$/;

export function validateScenario(body: Partial<ScenarioType>) {
	const errors: { [key: string]: string[] } = {
		name: [],
		time: [],
	};

	if (!body.name) {
		errors.name.push("Name is required");
	} else if (emptyRegex.test(body.name)) {
		errors.name.push("Name cannot be empty");
	} else {
		delete errors.name;
	}

	if (!body.time) {
		errors.time.push("Time is required");
	} else if (isNaN(body.time)) {
		errors.time.push("Time must be a number");
	} else {
		delete errors.time;
	}

	if (Object.keys(errors).length > 0) {
		throw ApiError.badRequest("Scenario Validation failed", errors);
	}

	return { time: Number(body.time), name: body.name } as Omit<ScenarioType, "id">;
}

export function getScenario(scenarioId: string) {
	const id = Number(scenarioId);
	if (isNaN(id)) {
		throw ApiError.badRequest(`Invalid Scenario ID "${scenarioId}", must be a number`);
	}
	const scenario = db.getScenario(id);
	if (!scenario) {
		throw ApiError.notFound(`Scenario with ID "${scenarioId}" not found`);
	}
	return scenario;
}
