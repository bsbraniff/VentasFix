import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Usuario.css";
import ListUsuarios from "./list";

function Usuarios(props) {



    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [editando, setEditando] = useState(false);

    const [usuarioId, setUsuarioId] = useState(null);

    const [formulario, setFormulario] = useState({
        rut: "",
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");


    // OBTENER USUARIOS



    // MANEJAR CAMBIOS DEL FORMULARIO


    const manejarCambio = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    // LIMPIAR FORMULARIO


    const limpiarFormulario = () => {
        setFormulario({
            rut: "",
            nombre: "",
            apellido: "",
            email: "",
            password: ""
        });

        setUsuarioId(null);
        setEditando(false);
    };


    // MOSTRAR FORMULARIO NUEVO

    const nuevoUsuario = () => {
        limpiarFormulario();

        setMensaje("");
        setMostrarFormulario(true);
    };


    // EDITAR USUARIO


    const editarUsuario = (usuario) => {
        setUsuarioId(usuario.id);

        setFormulario({
            rut: usuario.rut,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: ""
        });

        setEditando(true);
        setMostrarFormulario(true);

        setMensaje("");
    };


    // GUARDAR USUARIO


    const guardarUsuario = async (e) => {
        e.preventDefault();

        setMensaje("");

        try {

            if (
                !formulario.rut ||
                !formulario.nombre ||
                !formulario.apellido ||
                !formulario.email
            ) {
                setMensaje("Todos los campos obligatorios deben estar completos.");
                setTipoMensaje("danger");
                return;
            }

            if (!editando && !formulario.password) {
                setMensaje("La contraseña es obligatoria.");
                setTipoMensaje("danger");
                return;
            }

            if (!formulario.email.endsWith("@ventasfix.cl")) {
                setMensaje("El correo debe pertenecer al dominio @ventasfix.cl.");
                setTipoMensaje("danger");
                return;
            }

            if (editando) {

                const datosActualizados = {
                    rut: formulario.rut,
                    nombre: formulario.nombre,
                    apellido: formulario.apellido,
                    email: formulario.email
                };

                if (formulario.password) {
                    datosActualizados.password = formulario.password;
                }

                await api.put(
                    `/usuarios/${usuarioId}`,
                    datosActualizados
                );

                setMensaje("Usuario actualizado correctamente.");
                setTipoMensaje("success");

            } else {

                await api.post("/usuarios", formulario);

                setMensaje("Usuario creado correctamente.");
                setTipoMensaje("success");
            }

            limpiarFormulario();

            setMostrarFormulario(false);

            obtenerUsuarios();

        } catch (error) {

            console.error(error);

            const mensajeError =
                error.response?.data?.mensaje ||
                error.response?.data?.message ||
                "No fue posible guardar el usuario.";

            setMensaje(mensajeError);
            setTipoMensaje("danger");
        }
    };


    // ELIMINAR USUARIO


    const eliminarUsuario = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar este usuario?"
        );

        if (!confirmar) {
            return;
        }

        try {

            await api.delete(`/usuarios/${id}`);

            setMensaje("Usuario eliminado correctamente.");
            setTipoMensaje("success");

            obtenerUsuarios();

        } catch (error) {

            console.error(error);

            const mensajeError =
                error.response?.data?.mensaje ||
                error.response?.data?.message ||
                "No fue posible eliminar el usuario.";

            setMensaje(mensajeError);
            setTipoMensaje("danger");
        }
    };

    return (
        <div className="container-fluid usuarios-page">

            {/* ======================================
                ENCABEZADO
            ====================================== */}

            <div className="d-flex justify-content-between align-items-center usuarios-header">

                <div>
                    <h2 className="usuarios-title">
                        Mantenedor de Usuarios
                    </h2>

                    <p className="usuarios-subtitle">
                        Administración de usuarios del sistema
                    </p>
                </div>

                {
                    !mostrarFormulario && <button
                        className="btn btn-nuevo-usuario"
                        onClick={nuevoUsuario}
                    >
                        + Nuevo usuario
                    </button>
                }

            </div>

            {/* ======================================
                MENSAJE
            ====================================== */}

            {mensaje && (
                <div
                    className={`alert alert-${tipoMensaje} alert-dismissible fade show`}
                    role="alert"
                >
                    {mensaje}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMensaje("")}
                    ></button>
                </div>
            )}

            {/* ======================================
                FORMULARIO
            ====================================== */}

            {mostrarFormulario && (

                <div className="usuario-form-card">

                    <div className="usuario-form-header">
                        <h5 className="mb-0">
                            {editando
                                ? "Editar usuario"
                                : "Registrar nuevo usuario"}
                        </h5>

                    </div>

                    <div className="usuario-form-body">

                        <form onSubmit={guardarUsuario}>

                            <div className="row">

                                {/* RUT */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label usuario-label">
                                        RUT
                                    </label>

                                    <input
                                        type="text"
                                        name="rut"
                                        className="form-control usuario-input"
                                        value={formulario.rut}
                                        onChange={manejarCambio}
                                        placeholder="Ej: 12345678-9"
                                        required
                                    />

                                </div>

                                {/* NOMBRE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label usuario-label">
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form-control usuario-input"
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        required
                                    />

                                </div>

                                {/* APELLIDO */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label usuario-label">
                                        Apellido
                                    </label>

                                    <input
                                        type="text"
                                        name="apellido"
                                        className="form-control usuario-input"
                                        value={formulario.apellido}
                                        onChange={manejarCambio}
                                        required
                                    />

                                </div>

                                {/* EMAIL */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label usuario-label">
                                        Correo electrónico
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control usuario-input"
                                        value={formulario.email}
                                        onChange={manejarCambio}
                                        placeholder="usuario@ventasfix.cl"
                                        required
                                    />

                                </div>

                                {/* PASSWORD */}

                                <div className="col-md-12 mb-3">

                                    <label className="form-label usuario-label">
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control usuario-input"
                                        value={formulario.password}
                                        onChange={manejarCambio}
                                        placeholder={
                                            editando
                                                ? "Dejar vacío para mantener la contraseña actual"
                                                : "Ingrese una contraseña"
                                        }
                                        required={!editando}
                                    />

                                    {editando && (
                                        <small className="text-muted">
                                            Solo complete este campo si desea cambiar la contraseña.
                                        </small>
                                    )}

                                </div>

                            </div>

                            <div className="d-flex gap-2">

                                <button
                                    type="submit"
                                    className="btn btn-guardar"
                                >
                                    {editando
                                        ? "Guardar cambios"
                                        : "Crear usuario"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary btn-cancelar"
                                    onClick={() => {
                                        limpiarFormulario();
                                        setMostrarFormulario(false);
                                    }}
                                >
                                    Cancelar
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* ======================================
                TABLA
            ====================================== */}

            <ListUsuarios 
                mostrarFormulario={mostrarFormulario}
                eliminarUsuario={eliminarUsuario}
                editarUsuario={editarUsuario}
                setTipoMensaje={setTipoMensaje}
            />

        </div>
    );
}

export default Usuarios;