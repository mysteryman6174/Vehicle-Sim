import { useRef, useState } from "react";
import { VehicleType } from "../../types";
import "./Simulator.css";
import VehicleSpan from "./VehicleSpan";

type props = {
	vehicles: VehicleType[];
	duration: number;
};

const colors = [
	"var(--color-green)",
	"var(--color-red)",
	"var(--color-blue)",
	"var(--color-yellow)",
	"var(--color-violet)",
	"var(--color-orange)",
	"var(--color-pink)",
];

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

// simualtor grid is fixed to w x h = 1000 x 400, Assignment is vague af
export default function Simulator({ vehicles, duration }: props) {
	const [start, setStart] = useState(false);
	const timerRef = useRef<number | undefined>(undefined);

	function handleStart() {
		setStart(true);
		timerRef.current = setTimeout(() => {
			window.alert("Simulation Complete!");
		}, duration * 1000);
	}

	function handleReset() {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		setStart(false);
	}

	return (
		<div className="">
			<div className="btn-group">
				<button onClick={handleStart} disabled={start} style={{ background: "var(--color-green)" }}>
					Start Simulation
				</button>
				<button onClick={handleReset} disabled={!start} style={{ background: "var(--color-red)" }}>
					Reset Simulation
				</button>
			</div>
			<div className="simulation">
				{Array.from({ length: 84 }).map((_, index) => (
					<span className="sim-grid" key={index} aria-hidden></span>
				))}
				{start &&
					vehicles.map((vehicle) => (
						<VehicleSpan key={vehicle.id} vehicle={vehicle} color={getRandomColor()} duration={duration * 1000} />
					))}
			</div>
		</div>
	);
}
