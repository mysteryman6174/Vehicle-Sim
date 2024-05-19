"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database"));
const utils_1 = require("./utils");
exports.router = express_1.default.Router();
exports.router.get("/full", (_req, res) => {
    res.json(database_1.default.getScenarios());
});
exports.router.get("/minimal", (_req, res) => {
    res.json(database_1.default.getScenarioNamesAndIds());
});
exports.router
    .route("/")
    .post((req, res) => {
    const data = (0, utils_1.validateScenario)(req.body);
    const scenario = database_1.default.addScenario(data);
    res.status(201).json(scenario);
})
    .delete((_req, res) => {
    database_1.default.deleteAllScenarios();
    res.status(200).json({ message: `All scenarios deleted` });
});
exports.router
    .route("/:scenarioId")
    .get((req, res) => {
    const scenario = (0, utils_1.getScenario)(req.params.scenarioId);
    res.status(200).json(scenario);
})
    .patch((req, res) => {
    const scenario = (0, utils_1.getScenario)(req.params.scenarioId);
    const data = (0, utils_1.validateScenario)(req.body);
    database_1.default.updateScenario(scenario, data);
    res.status(200).json(scenario);
})
    .delete((req, res) => {
    const scenario = (0, utils_1.getScenario)(req.params.scenarioId);
    database_1.default.deleteScenario(scenario);
    res.status(200).json({ message: `Scenario with ID ${req.params.scenarioId} deleted` });
});
//# sourceMappingURL=router.js.map