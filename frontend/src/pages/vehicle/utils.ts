import { VehicleType } from "../../types";
//grid size 1000 x 400

export function validateData(data: Omit<VehicleType, "id">) {
	const errors: { [key: string]: string[] } = {};

	if (!data.name) {
		errors.name = ["Name is Required"];
	}

	if (data.speed < 0) {
		errors.speed = ["Speed cannot be negative"];
	} else if (data.speed == 0) {
		errors.speed = ["Speed cannot be zero"];
	}

	if (data.posx < 0) {
		errors.posx = ["Position X cannot be negative"];
	} else if (data.posx > 1000) {
		errors.posx = ["Position X cannot be greater than 1000"];
	} else if (data.posx === undefined) {
		errors.posx = ["Position X is Required"];
	}

	if (data.posy < 0) {
		errors.posy = ["Position Y cannot be negative"];
	} else if (data.posy > 400) {
		errors.posy = ["Position Y cannot be greater than 400"];
	} else if (!data.posy === undefined) {
		errors.posy = ["Position Y is Required"];
	}

	return errors;
}
