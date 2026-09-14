import { useEffect, useState } from "react";
import api from "../../services/api";

const ListUsuarios = ({ mostrarFormulario = false, eliminarUsuario = false, editarUsuario = false }) => {
    const [usuarios, setUsuarios] = useState([]);

    //const [userMessage, setUserMessage] = useState({});


    const obtenerUsuarios = async () => {
        try {
            const respuesta = await api.get("/usuarios");

            setUsuarios(respuesta.data);

        } catch (error) {
            console.error(error);

            // setUserMessage({
            //     texto: "No fue posible obtener los usuarios.",
            //     tipo: "danger"
            // })

            setMensaje("No fue posible obtener los usuarios.");
            setTipoMensaje("danger");


        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return <>
        {
            !mostrarFormulario && <div className="usuarios-table-card">

                <div className="usuarios-table-header">

                    <h5 className="mb-0">
                        Usuarios registrados
                    </h5>

                </div>

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table usuarios-table">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>
                                    <th>RUT</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th className="text-center">
                                        Acciones
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {usuarios?.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-4 text-muted"
                                        >
                                            No existen usuarios registrados.
                                        </td>

                                    </tr>

                                ) : (

                                    usuarios?.map((usuario) => (

                                        <tr key={usuario?.id}>

                                            <td>
                                                {usuario?.id}
                                            </td>

                                            <td>
                                                {usuario?.rut}
                                            </td>

                                            <td>
                                                {usuario?.nombre}
                                            </td>

                                            <td>
                                                {usuario?.apellido}
                                            </td>

                                            <td>
                                                {usuario?.email || "no tengo email"}
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-editar me-2"
                                                    onClick={() =>
                                                        editarUsuario && editarUsuario(usuario)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-eliminar"
                                                    onClick={() =>
                                                        eliminarUsuario && eliminarUsuario(usuario.id)
                                                    }
                                                >
                                                    Eliminar
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        }</>
}

export default ListUsuarios;