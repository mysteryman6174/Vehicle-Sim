import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./pages/layout/Layout";
import Scenarios from "./pages/scenarios/AllScenarios";
import Scenario from "./pages/scenarios/scenario/Scenario";
import Vehicle from "./pages/vehicle/Vehicle";
import Error from "./pages/error/Error";

const route = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{ path: "", index: true, element: <Home />, loader: Scenarios.loader, action: Home.action },
			{
				path: "scenarios",
				children: [
					{ path: "", index: true, element: <Scenarios />, loader: Scenarios.loader, action: Scenarios.action },
					{ path: "add", element: <Scenario mode="add" />, action: Scenario.action },
					{
						path: ":scenarioId",
						element: <Scenario mode="edit" />,
						loader: Scenario.loader,
						action: Scenario.action,
					},
					{
						path: ":scenarioId/vehicles",
						children: [
							{ path: ":vehicleId", element: <Vehicle mode="edit" />, loader: Vehicle.loader, action: Vehicle.action },
							{ path: "add", element: <Vehicle mode="add" />, loader: Vehicle.loader, action: Vehicle.action },
						],
					},
				],
			},
			{
				path: "vehicles",
				children: [{ path: "add", element: <Vehicle mode="add" />, loader: Vehicle.loader, action: Vehicle.action }],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={route} />;
}

export default App;
