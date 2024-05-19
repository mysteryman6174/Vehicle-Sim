import { NavLink } from "react-router-dom";
import "./SideBar.css";

const tabs = [
	{ name: "Home", href: "/" },
	{ name: "All Scenarios", href: "/scenarios" },
	{ name: "Add Scenario", href: "/scenarios/add/" },
	{ name: "Add Vehicle", href: "/vehicles/add" },
];

export default function SideBar() {
	return (
		<aside className="sidebar">
			<ul className="sidebar-nav">
				{tabs.map((tab) => (
					<NavLink to={tab.href} className="sidebar-nav-item" key={tab.name} end>
						<li>{tab.name}</li>
					</NavLink>
				))}
			</ul>
		</aside>
	);
}
