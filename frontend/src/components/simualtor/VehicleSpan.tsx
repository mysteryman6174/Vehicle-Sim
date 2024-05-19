import { useState } from "react";
import useRequestAnimationFrame from "../../hooks/useRequestAnimationFram";
import { VehicleType } from "../../types";

function jankyOverflowFix(pos: { x: number; y: number }) {
	if (pos.x == 0 || pos.y == 0) {
		return "translate(0%, 0%)";
	} else if (pos.x == 1000 || pos.y == 400) {
		return "translate(-100%, -100%)";
	} else {
		return "translate(-50%, -50%)";
	}
}

type props = {
	vehicle: VehicleType;
	color: string;
	duration: number;
};

export default function VehicleSpan({ vehicle, color, duration }: props) {
	const [pos, setPos] = useState({ x: vehicle.posx, y: vehicle.posy });

	useRequestAnimationFrame((deltaTime) => {
		if (vehicle.direction === "backwards") {
			setPos((prevPos) => ({ x: prevPos.x - vehicle.speed * (deltaTime / 500), y: prevPos.y }));
		} else if (vehicle.direction === "towards") {
			setPos((prevPos) => ({ x: prevPos.x + vehicle.speed * (deltaTime / 500), y: prevPos.y }));
		} else if (vehicle.direction === "upwards") {
			setPos((prevPos) => ({ x: prevPos.x, y: prevPos.y - vehicle.speed * (deltaTime / 500) }));
		} else if (vehicle.direction === "downwards") {
			setPos((prevPos) => ({ x: prevPos.x, y: prevPos.y + vehicle.speed * (deltaTime / 500) }));
		}
	}, duration);

	return (
		<span
			className="vehicle"
			key={vehicle.id}
			style={{
				left: `${pos.x}px`,
				top: `${pos.y}px`,
				background: color,
				transform: jankyOverflowFix(pos),
			}}>
			{vehicle.id}
		</span>
	);
}
