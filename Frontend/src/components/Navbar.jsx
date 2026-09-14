import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        window.location.href = "/login";
    };

    return (
        <nav className="navbar navbar-ventasfix">
            <div className="container-fluid px-4">

                <Link
                    className="navbar-brand-ventasfix"
                    to="/dashboard"
                >
                    Ventas<span>Fix</span>
                </Link>

                <button
                    className="btn btn-logout"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </button>

            </div>
        </nav>
    );
}

export default Navbar;