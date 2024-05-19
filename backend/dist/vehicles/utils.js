"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicle = exports.validateVehicle = void 0;
const apiError_1 = __importDefault(require("../apiError"));
const database_1 = __importDefault(require("../database"));
const utils_1 = require("../scenarios/utils");
const emptyRegex = /^\s*$/;
function validatePos(pos, min = 0, max = 800) {
    if (pos === undefined) {
        return "Position cannot be empty";
    }
    else if (isNaN(pos)) {
        return "Position must be a number";
    }
    else if (pos < min || pos > max) {
        return `Position must be between ${min} and ${max}`;
    }
    return true;
}
function validateVehicle(body) {
    const errors = {
        name: [],
        posx: [],
        posy: [],
        speed: [],
        direction: [],
    };
    if (!body.name) {
        errors.name.push("Name cannot be empty");
    }
    else if (emptyRegex.test(body.name)) {
        errors.name.push("Name cannot be empty");
    }
    else {
        delete errors.name;
    }
    const isPosXValid = validatePos(body.posx, 0, 1000);
    const isPosYValid = validatePos(body.posy, 0, 400);
    if (isPosXValid !== true) {
        errors.posx.push(isPosXValid);
    }
    else {
        delete errors.posx;
    }
    if (isPosYValid !== true) {
        errors.posy.push(isPosYValid);
    }
    else {
        delete errors.posy;
    }
    if (body.speed === undefined) {
        errors.speed.push("Speed cannot be empty");
    }
    else if (isNaN(body.speed)) {
        errors.speed.push("Speed must be a number");
    }
    else if (body.speed <= 0) {
        errors.speed.push("Speed must be greater than 0");
    }
    else {
        delete errors.speed;
    }
    if (!body.direction) {
        errors.direction.push("Direction cannot be empty");
    }
    switch (body.direction) {
        case "towards":
        case "backwards":
        case "upwards":
        case "downwards":
            delete errors.direction;
            break;
        default:
            errors.direction.push("Direction must be one of towards, backwards, upwards or downwards");
    }
    if (Object.keys(errors).length > 0) {
        throw apiError_1.default.badRequest("Invalid vehicle data", errors);
    }
    return {
        name: body.name,
        posx: Number(body.posx),
        posy: Number(body.posy),
        speed: Number(body.speed),
        direction: body.direction,
    };
}
exports.validateVehicle = validateVehicle;
function getVehicle(scenarioId, vehicleId) {
    const scenario = (0, utils_1.getScenario)(scenarioId);
    const vhId = Number(vehicleId);
    if (isNaN(vhId)) {
        throw apiError_1.default.badRequest(`Invalid Vehicle ID "${vehicleId}", must be a number`);
    }
    const vehicle = database_1.default.getVehicle(scenario, vhId);
    if (!vehicle) {
        throw apiError_1.default.notFound(`Vehicle with ID ${vehicleId} not found in scenario ${scenario.id}`);
    }
    return { scenario, vehicle };
}
exports.getVehicle = getVehicle;
//# sourceMappingURL=utils.js.map