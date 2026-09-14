import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
    const [estadisticas, setEstadisticas] = useState({
        usuarios: 0,
        productos: 0,
        clientes: 0
    });

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    const cargarEstadisticas = async () => {
        try {
            setCargando(true);
            setError("");

            const [usuarios, productos, clientes] = await Promise.all([
                api.get("/usuarios"),
                api.get("/productos"),
                api.get("/clientes")
            ]);

            setEstadisticas({
                usuarios: usuarios.data.length,
                productos: productos.data.length,
                clientes: clientes.data.length
            });

        } catch (error) {
            console.error("Error al cargar estadísticas:", error);

            setError(
                "No fue posible cargar las estadísticas del sistema."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>

            <div className="mb-4">
                <h1 className="fw-bold">
                    Dashboard
                </h1>

                <p className="text-muted">
                    Resumen general del sistema VentasFix
                </p>
            </div>

            {cargando && (
                <div className="alert alert-info">
                    Cargando información...
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!cargando && !error && (
                <div className="row g-4">

                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="usuario-form-body">

                                <h6 className="text-muted">
                                    Usuarios
                                </h6>

                                <h2 className="fw-bold">
                                    {estadisticas.usuarios}
                                </h2>

                                <p className="mb-0 text-muted">
                                    Usuarios registrados
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="usuario-form-body">

                                <h6 className="text-muted">
                                    Productos
                                </h6>

                                <h2 className="fw-bold">
                                    {estadisticas.productos}
                                </h2>

                                <p className="mb-0 text-muted">
                                    Productos registrados
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="usuario-form-body">

                                <h6 className="text-muted">
                                    Clientes
                                </h6>

                                <h2 className="fw-bold">
                                    {estadisticas.clientes}
                                </h2>

                                <p className="mb-0 text-muted">
                                    Clientes registrados
                                </p>

                            </div>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}

export default Dashboard;