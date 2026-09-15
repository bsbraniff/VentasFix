import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function ListClientes({ clientes, recargarClientes }) {

    const navigate = useNavigate();

    const eliminarCliente = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de que desea eliminar este cliente?"
        );

        if (!confirmar) {
            return;
        }

        try {

            await api.delete(`/clientes/${id}`);

            recargarClientes();

        } catch (error) {

            console.error("Error al eliminar cliente:", error);

            alert(
                error.response?.data?.message ||
                "No fue posible eliminar el cliente."
            );
        }
    };

    if (clientes.length === 0) {

        return (
            <div className="clientes-empty">

                <h5>No hay clientes registrados</h5>

                <p>
                    Actualmente no existen clientes empresa registrados.
                </p>

            </div>
        );
    }

    return (

        <div className="clientes-table-container">

            <div className="table-responsive">

                <table className="table table-hover clientes-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>RUT Empresa</th>
                            <th>Razón Social</th>
                            <th>Rubro</th>
                            <th>Teléfono</th>
                            <th>Contacto</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {clientes.map((cliente) => (

                            <tr key={cliente.id}>

                                <td>
                                    {cliente.id}
                                </td>

                                <td>
                                    {cliente.rut_empresa}
                                </td>

                                <td>
                                    <strong>
                                        {cliente.razon_social}
                                    </strong>
                                </td>

                                <td>
                                    {cliente.rubro}
                                </td>

                                <td>
                                    {cliente.telefono}
                                </td>

                                <td>
                                    {cliente.nombre_contacto}
                                </td>

                                <td>
                                    {cliente.email_contacto}
                                </td>

                                <td>

                                    <div className="clientes-actions">

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-warning"
                                            onClick={() =>
                                                navigate(
                                                    `/clientes/editar/${cliente.id}`
                                                )
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={() =>
                                                eliminarCliente(cliente.id)
                                            }
                                        >
                                            Eliminar
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ListClientes;