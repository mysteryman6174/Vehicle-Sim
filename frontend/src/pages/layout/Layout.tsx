import { Outlet } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import "./Layout.css";

export default function Layout() {
	return (
		<main className="layout">
			<SideBar />
			<Outlet />
		</main>
	);
}
