import express from "express";
import db from "../database";
import { getScenario, validateScenario } from "./utils";

export const router = express.Router();

router.get("/full", (_req, res) => {
	res.json(db.getScenarios());
});

router.get("/minimal", (_req, res) => {
	res.json(db.getScenarioNamesAndIds());
});

router
	.route("/")
	.post((req, res) => {
		const data = validateScenario(req.body);
		const scenario = db.addScenario(data);
		res.status(201).json(scenario);
	})
	.delete((_req, res) => {
		db.deleteAllScenarios();
		res.status(200).json({ message: `All scenarios deleted` });
	});

router
	.route("/:scenarioId")
	.get((req, res) => {
		const scenario = getScenario(req.params.scenarioId);
		res.status(200).json(scenario);
	})
	.patch((req, res) => {
		const scenario = getScenario(req.params.scenarioId);
		const data = validateScenario(req.body);
		db.updateScenario(scenario, data);
		res.status(200).json(scenario);
	})
	.delete((req, res) => {
		const scenario = getScenario(req.params.scenarioId);
		db.deleteScenario(scenario);
		res.status(200).json({ message: `Scenario with ID ${req.params.scenarioId} deleted` });
	});
