"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScenario = exports.validateScenario = void 0;
const apiError_1 = __importDefault(require("../apiError"));
const database_1 = __importDefault(require("../database"));
const emptyRegex = /^\s*$/;
function validateScenario(body) {
    const errors = {
        name: [],
        time: [],
    };
    if (!body.name) {
        errors.name.push("Name is required");
    }
    else if (emptyRegex.test(body.name)) {
        errors.name.push("Name cannot be empty");
    }
    else {
        delete errors.name;
    }
    if (!body.time) {
        errors.time.push("Time is required");
    }
    else if (isNaN(body.time)) {
        errors.time.push("Time must be a number");
    }
    else {
        delete errors.time;
    }
    if (Object.keys(errors).length > 0) {
        throw apiError_1.default.badRequest("Scenario Validation failed", errors);
    }
    return { time: Number(body.time), name: body.name };
}
exports.validateScenario = validateScenario;
function getScenario(scenarioId) {
    const id = Number(scenarioId);
    if (isNaN(id)) {
        throw apiError_1.default.badRequest(`Invalid Scenario ID "${scenarioId}", must be a number`);
    }
    const scenario = database_1.default.getScenario(id);
    if (!scenario) {
        throw apiError_1.default.notFound(`Scenario with ID "${scenarioId}" not found`);
    }
    return scenario;
}
exports.getScenario = getScenario;
//# sourceMappingURL=utils.js.map