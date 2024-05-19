import { Form, Link, useSubmit } from "react-router-dom";
import IconEdit from "../../../assets/edit.svg";
import IconTrash from "../../../assets/trash.svg";
import { VehicleType } from "../../../types";

type props = {
	vehicles: VehicleType[];
	scenarioId: number;
};

function VehiclesTable({ vehicles, scenarioId }: props) {
	const submit = useSubmit();

	return (
		<table>
			<thead>
				<tr>
					<th>Vehicle ID</th>
					<th>Vehicle Name</th>
					<th>Pos X</th>
					<th>Pos Y</th>
					<th>Speed</th>
					<th>Diretion</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{vehicles.map((vehicle) => (
					<tr key={vehicle.id}>
						<td>{vehicle.id}</td>
						<td>{vehicle.name}</td>
						<td>{vehicle.posx}</td>
						<td>{vehicle.posy}</td>
						<td>{vehicle.speed}</td>
						<td>{vehicle.direction}</td>
						<td>
							<Link to={`/scenarios/${scenarioId}/vehicles/${vehicle.id}`}>
								<img src={IconEdit} alt="Edit-Scenario" />
							</Link>
						</td>
						<td>
							<Form method="DELETE" onClick={(e) => submit(e.currentTarget)}>
								<input type="hidden" name="scenarioId" value={scenarioId} />
								<input type="hidden" name="vehicleId" value={vehicle.id} />
								<img src={IconTrash} alt="Delete-Scenario" />
							</Form>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default VehiclesTable;
