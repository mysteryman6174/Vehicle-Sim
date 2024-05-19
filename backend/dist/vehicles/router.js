"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database"));
const utils_1 = require("../scenarios/utils");
const utils_2 = require("./utils");
exports.router = express_1.default.Router();
exports.router.get("/vehicles", (_req, res) => {
    res.json(database_1.default.getVehicles());
});
exports.router
    .route("/:scenarioId/vehicles")
    .get((req, res) => {
    const scenario = (0, utils_1.getScenario)(req.params.scenarioId);
    res.json(database_1.default.getScenarioVehicles(scenario));
})
    .post((req, res) => {
    const scenario = (0, utils_1.getScenario)(req.params.scenarioId);
    const data = (0, utils_2.validateVehicle)(req.body);
    const vehicle = database_1.default.addVehicle(scenario, data);
    res.status(201).json(vehicle);
});
exports.router
    .route("/:scenarioId/vehicles/:vehicleId")
    .get((req, res) => {
    const { vehicle } = (0, utils_2.getVehicle)(req.params.scenarioId, req.params.vehicleId);
    res.json(vehicle);
})
    .patch((req, res) => {
    const { vehicle } = (0, utils_2.getVehicle)(req.params.scenarioId, req.params.vehicleId);
    const data = (0, utils_2.validateVehicle)(req.body);
    database_1.default.updateVehicle(vehicle, data);
    res.json(vehicle);
})
    .delete((req, res) => {
    const { scenario, vehicle } = (0, utils_2.getVehicle)(req.params.scenarioId, req.params.vehicleId);
    database_1.default.deleteVehicle(scenario, vehicle);
    res.status(200).json({ message: `Vehicle with ID ${vehicle.id} deleted from scenario ${scenario.id}` });
});
//# sourceMappingURL=router.js.map