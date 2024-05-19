"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const DATBASE_LOC = process.env.DATABASE_LOC || "./src/db.json";
function readData(fileLoc) {
    try {
        const data = fs_1.default.readFileSync(fileLoc, "utf8");
        return JSON.parse(data);
    }
    catch (err) {
        return {};
    }
}
function writeData(fileLoc, data) {
    fs_1.default.writeFileSync(fileLoc, JSON.stringify(data, null, 2));
}
class Database {
    data;
    constructor() {
        this.data = readData(DATBASE_LOC);
    }
    commit() {
        writeData(DATBASE_LOC, this.data);
    }
    getNextScenarioKey(obj) {
        const highest = Object.keys(obj).reduce((a, b) => (a > b ? a : b), "0");
        return Number(highest) + 1;
    }
    getNextVehicleKey(obj) {
        const highest = obj.reduce((a, b) => (a > b.id ? a : b.id), 0);
        return Number(highest) + 1;
    }
    // All Scenario Operations
    getScenario(scenarioId) {
        return this.data[scenarioId];
    }
    getScenarios() {
        return Object.values(this.data);
    }
    getScenarioNamesAndIds() {
        return Object.values(this.data).map((s) => ({
            id: s.id,
            name: s.name,
        }));
    }
    addScenario(data) {
        const id = this.getNextScenarioKey(this.data);
        this.data[id] = { ...data, id, vehicles: [] };
        this.commit();
        return this.data[id];
    }
    updateScenario(scenario, data) {
        Object.assign(scenario, data);
        this.commit();
    }
    deleteScenario(scenario) {
        delete this.data[scenario.id];
        this.commit();
    }
    deleteAllScenarios() {
        this.data = {};
        this.commit();
    }
    // All Vehicle Operations
    getVehicles() {
        return Object.values(this.data)
            .map((s) => s.vehicles)
            .flat();
    }
    getScenarioVehicles(scenario) {
        return scenario.vehicles;
    }
    getVehicle(scenario, vehicleId) {
        return scenario.vehicles.find((v) => v.id === vehicleId);
    }
    addVehicle(scenario, data) {
        const id = this.getNextVehicleKey(scenario.vehicles);
        scenario.vehicles.push({ ...data, id });
        this.commit();
        return { ...data, id };
    }
    updateVehicle(vehicle, data) {
        Object.assign(vehicle, data);
        this.commit();
    }
    deleteVehicle(scenario, vehicle) {
        scenario.vehicles = scenario.vehicles.filter((v) => v.id !== vehicle.id);
        this.commit();
    }
}
const db = new Database();
exports.default = db;
//# sourceMappingURL=database.js.map