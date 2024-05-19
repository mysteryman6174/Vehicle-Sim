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
