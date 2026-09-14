import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

    return (
        <aside className="sidebar-ventasfix">

            <div className="sidebar-title">
                Menú principal
            </div>

            <ul className="nav flex-column gap-2">

                <li className="nav-item">
                    <NavLink
                        to="/dashboard"
                        className="sidebar-link"
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/usuarios"
                        className="sidebar-link"
                    >
                        Usuarios
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/productos"
                        className="sidebar-link"
                    >
                        Productos
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/clientes"
                        className="sidebar-link"
                    >
                        Clientes
                    </NavLink>
                </li>

            </ul>

        </aside>
    );
}

export default Sidebar;