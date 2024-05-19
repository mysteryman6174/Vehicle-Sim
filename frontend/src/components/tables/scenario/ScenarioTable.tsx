import { Form, Link, useSubmit } from "react-router-dom";
import IconCirle from "../../../assets/circle-plus.svg";
import IconEdit from "../../../assets/edit.svg";
import IconTrash from "../../../assets/trash.svg";
import { ScenarioType } from "../../../types";
import "../Table.css";

type props = {
	scenarios: ScenarioType[];
};

export default function ScenarioTable({ scenarios }: props) {
	const submit = useSubmit();

	return (
		<table>
			<thead>
				<tr>
					<th>Scenario ID</th>
					<th>Scenario Name</th>
					<th>Scenario Time</th>
					<th>Number of Vehicles</th>
					<th>Add Vehicle</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{scenarios.map((scenario) => (
					<tr key={scenario.id}>
						<td>{scenario.id}</td>
						<td>{scenario.name}</td>
						<td>{scenario.time}s</td>
						<td>{scenario.vehicles.length}</td>
						<td>
							<Link to={`/scenarios/${scenario.id}/vehicles/add`}>
								<img src={IconCirle} alt="Add-Vehicle" />
							</Link>
						</td>
						<td>
							<Link to={`/scenarios/${scenario.id}`}>
								<img src={IconEdit} alt="Edit-Scenario" />
							</Link>
						</td>
						<td>
							<Form method="DELETE" onClick={(e) => submit(e.currentTarget)}>
								<input type="hidden" name="scenarioId" value={scenario.id} />
								<img src={IconTrash} alt="Delete-Scenario" />
							</Form>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
