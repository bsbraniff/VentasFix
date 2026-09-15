import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import "./Clientes.css";

function ClienteForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const modoEdicion = Boolean(id);

    const [formulario, setFormulario] = useState({
        rut_empresa: "",
        rubro: "",
        razon_social: "",
        telefono: "",
        direccion: "",
        nombre_contacto: "",
        email_contacto: ""
    });

    const [cargando, setCargando] = useState(modoEdicion);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {

        if (!modoEdicion) {
            return;
        }

        const cargarCliente = async () => {

            try {

                setCargando(true);
                setError("");

                const response = await api.get(`/clientes/${id}`);

                setFormulario({
                    rut_empresa: response.data.rut_empresa || "",
                    rubro: response.data.rubro || "",
                    razon_social: response.data.razon_social || "",
                    telefono: response.data.telefono || "",
                    direccion: response.data.direccion || "",
                    nombre_contacto: response.data.nombre_contacto || "",
                    email_contacto: response.data.email_contacto || ""
                });

            } catch (error) {

                console.error("Error al obtener cliente:", error);

                setError(
                    error.response?.data?.message ||
                    "No fue posible cargar el cliente."
                );

            } finally {

                setCargando(false);

            }
        };

        cargarCliente();

    }, [id, modoEdicion]);

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const manejarEnvio = async (e) => {

        e.preventDefault();

        setError("");
        setMensaje("");

        const camposVacios = Object.values(formulario).some(
            (valor) => valor.trim() === ""
        );

        if (camposVacios) {

            setError("Todos los campos son obligatorios.");

            return;
        }

        if (!formulario.email_contacto.includes("@")) {

            setError("Ingrese un email de contacto válido.");

            return;
        }

        try {

            setGuardando(true);

            if (modoEdicion) {

                await api.put(
                    `/clientes/${id}`,
                    formulario
                );

                setMensaje("Cliente actualizado correctamente.");

            } else {

                await api.post(
                    "/clientes",
                    formulario
                );

                setMensaje("Cliente creado correctamente.");
            }

            setTimeout(() => {
                navigate("/clientes");
            }, 1000);

        } catch (error) {

            console.error("Error al guardar cliente:", error);

            if (error.response?.data?.message) {

                setError(error.response.data.message);

            } else {

                setError(
                    modoEdicion
                        ? "No fue posible actualizar el cliente."
                        : "No fue posible crear el cliente."
                );
            }

        } finally {

            setGuardando(false);

        }
    };

    if (cargando) {

        return (
            <div className="clientes-page">

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
                        Cargando información del cliente...
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="clientes-page">

            <div className="clientes-header">

                <div>

                    <h1>
                        {modoEdicion
                            ? "Editar Cliente"
                            : "Nuevo Cliente"
                        }
                    </h1>

                    <p>
                        {modoEdicion
                            ? "Modificar información del cliente empresa."
                            : "Registrar un nuevo cliente empresa en VentasFix."
                        }
                    </p>

                </div>

            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {mensaje && (
                <div className="alert alert-success">
                    {mensaje}
                </div>
            )}

            <div className="clientes-form-container">

                <form onSubmit={manejarEnvio}>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                RUT Empresa
                            </label>

                            <input
                                type="text"
                                name="rut_empresa"
                                className="form-control"
                                value={formulario.rut_empresa}
                                onChange={manejarCambio}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Rubro
                            </label>

                            <input
                                type="text"
                                name="rubro"
                                className="form-control"
                                value={formulario.rubro}
                                onChange={manejarCambio}
                            />

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="form-label">
                                Razón Social
                            </label>

                            <input
                                type="text"
                                name="razon_social"
                                className="form-control"
                                value={formulario.razon_social}
                                onChange={manejarCambio}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Teléfono
                            </label>

                            <input
                                type="text"
                                name="telefono"
                                className="form-control"
                                value={formulario.telefono}
                                onChange={manejarCambio}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Dirección
                            </label>

                            <input
                                type="text"
                                name="direccion"
                                className="form-control"
                                value={formulario.direccion}
                                onChange={manejarCambio}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Nombre de contacto
                            </label>

                            <input
                                type="text"
                                name="nombre_contacto"
                                className="form-control"
                                value={formulario.nombre_contacto}
                                onChange={manejarCambio}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Email de contacto
                            </label>

                            <input
                                type="email"
                                name="email_contacto"
                                className="form-control"
                                value={formulario.email_contacto}
                                onChange={manejarCambio}
                            />

                        </div>

                    </div>

                    <div className="d-flex gap-2 mt-3">

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : modoEdicion
                                    ? "Actualizar cliente"
                                    : "Guardar cliente"
                            }
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/clientes")}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default ClienteForm;