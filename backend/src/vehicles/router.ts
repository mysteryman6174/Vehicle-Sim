import express from "express";
import db from "../database";
import { getScenario } from "../scenarios/utils";
import { getVehicle, validateVehicle } from "./utils";

export const router = express.Router();

router.get("/vehicles", (_req, res) => {
	res.json(db.getVehicles());
});

router
	.route("/:scenarioId/vehicles")
	.get((req, res) => {
		const scenario = getScenario(req.params.scenarioId);
		res.json(db.getScenarioVehicles(scenario));
	})
	.post((req, res) => {
		const scenario = getScenario(req.params.scenarioId);
		const data = validateVehicle(req.body);
		const vehicle = db.addVehicle(scenario, data);
		res.status(201).json(vehicle);
	});

router
	.route("/:scenarioId/vehicles/:vehicleId")
	.get((req, res) => {
		const { vehicle } = getVehicle(req.params.scenarioId, req.params.vehicleId);
		res.json(vehicle);
	})
	.patch((req, res) => {
		const { vehicle } = getVehicle(req.params.scenarioId, req.params.vehicleId);
		const data = validateVehicle(req.body);
		db.updateVehicle(vehicle, data);
		res.json(vehicle);
	})
	.delete((req, res) => {
		const { scenario, vehicle } = getVehicle(req.params.scenarioId, req.params.vehicleId);
		db.deleteVehicle(scenario, vehicle);
		res.status(200).json({ message: `Vehicle with ID ${vehicle.id} deleted from scenario ${scenario.id}` });
	});
