import fs from "fs";

const DATBASE_LOC = process.env.DATABASE_LOC || "./src/db.json";

export type ScenarioType = {
	id: number;
	name: string;
	time: number;
	vehicles: VehicleType[];
};

export type VehicleType = {
	id: number;
	name: string;
	posx: number;
	posy: number;
	speed: number;
	direction: "towards" | "backwards" | "upwards" | "downwards";
};

type Data = {
	[key: number]: ScenarioType;
};

function readData(fileLoc: string) {
	try {
		const data = fs.readFileSync(fileLoc, "utf8");
		return JSON.parse(data) as Data;
	} catch (err) {
		return {};
	}
}

function writeData(fileLoc: string, data: Data) {
	fs.writeFileSync(fileLoc, JSON.stringify(data, null, 2));
}

class Database {
	private data: Data;

	constructor() {
		this.data = readData(DATBASE_LOC);
	}

	commit() {
		writeData(DATBASE_LOC, this.data);
	}

	getNextScenarioKey(obj: Data) {
		const highest = Object.keys(obj).reduce((a, b) => (a > b ? a : b), "0");
		return Number(highest) + 1;
	}

	getNextVehicleKey(obj: VehicleType[]) {
		const highest = obj.reduce((a, b) => (a > b.id ? a : b.id), 0);
		return Number(highest) + 1;
	}

	// All Scenario Operations
	getScenario(scenarioId: number) {
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

	addScenario(data: Omit<ScenarioType, "id">) {
		const id = this.getNextScenarioKey(this.data);
		this.data[id] = { ...data, id, vehicles: [] };
		this.commit();
		return this.data[id];
	}

	updateScenario(scenario: ScenarioType, data: Omit<ScenarioType, "id">) {
		Object.assign(scenario, data);
		this.commit();
	}

	deleteScenario(scenario: ScenarioType) {
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

	getScenarioVehicles(scenario: ScenarioType) {
		return scenario.vehicles;
	}

	getVehicle(scenario: ScenarioType, vehicleId: number) {
		return scenario.vehicles.find((v) => v.id === vehicleId);
	}

	addVehicle(scenario: ScenarioType, data: Omit<VehicleType, "id">) {
		const id = this.getNextVehicleKey(scenario.vehicles);
		scenario.vehicles.push({ ...data, id });
		this.commit();
		return { ...data, id };
	}

	updateVehicle(vehicle: VehicleType, data: Omit<VehicleType, "id">) {
		Object.assign(vehicle, data);
		this.commit();
	}

	deleteVehicle(scenario: ScenarioType, vehicle: VehicleType) {
		scenario.vehicles = scenario.vehicles.filter((v) => v.id !== vehicle.id);
		this.commit();
	}
}

const db = new Database();
export default db;
