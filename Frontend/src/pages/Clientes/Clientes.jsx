import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import ListClientes from "./List";

import "./Clientes.css";

function Clientes() {

    const navigate = useNavigate();

    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const cargarClientes = async () => {

        try {

            setCargando(true);
            setError("");

            const response = await api.get("/clientes");

            setClientes(response.data);

        } catch (error) {

            console.error("Error al obtener clientes:", error);

            setError("No fue posible cargar los clientes.");

        } finally {

            setCargando(false);

        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    return (
        <div className="clientes-page">

            {/* ENCABEZADO */}

            <div className="clientes-header">

                <div>
                    <h1 className="clientes-title">
                        Mantenedor de Clientes
                    </h1>

                    <p className="clientes-subtitle">
                        Administración de clientes empresa registrados en VentasFix.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/clientes/nuevo")}
                >
                    + Nuevo cliente
                </button>

            </div>


            {/* MENSAJE DE ERROR */}

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}


            {/* LISTADO */}

            {cargando ? (

                <div className="clientes-loading">
                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Cargando...
                        </span>
                    </div>

                    <p>
                        Cargando clientes...
                    </p>
                </div>

            ) : (

                <ListClientes
                    clientes={clientes}
                    recargarClientes={cargarClientes}
                />

            )}

        </div>
    );
}

export default Clientes;

