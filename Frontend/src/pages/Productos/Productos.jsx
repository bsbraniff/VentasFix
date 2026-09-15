import { useEffect, useState } from "react";


import api from "../../services/api";


import List from "./List";
import Form from "./Form";
import "./Productos.css";


const Productos = () => {

    const [productos, setProductos] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [productoEditar, setProductoEditar] = useState(null);

    const [mensaje, setMensaje] = useState("");

    const [error, setError] = useState("");


    const cargarProductos = async () => {

        try {

            const respuesta = await api.get("/productos");

            setProductos(respuesta.data);

        } catch (error) {

            console.error(error);

            setError(
                "No fue posible cargar los productos."
            );

        }

    };


    useEffect(() => {

        cargarProductos();

    }, []);


    const abrirCrear = () => {

        setProductoEditar(null);

        setMostrarFormulario(true);

        setMensaje("");

        setError("");

    };


    const abrirEditar = (producto) => {

        setProductoEditar(producto);

        setMostrarFormulario(true);

        setMensaje("");

        setError("");

    };


    const cancelarFormulario = () => {

        setMostrarFormulario(false);

        setProductoEditar(null);

    };


    const guardarProducto = async (datos) => {

        try {

            setError("");

            setMensaje("");


            if (productoEditar) {

                await api.put(
                    `/productos/${productoEditar.id}`,
                    datos
                );

                setMensaje(
                    "Producto actualizado correctamente."
                );

            } else {

                await api.post(
                    "/productos",
                    datos
                );

                setMensaje(
                    "Producto creado correctamente."
                );

            }


            setMostrarFormulario(false);

            setProductoEditar(null);

            await cargarProductos();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.mensaje ||
                "No fue posible guardar el producto."
            );

        }

    };


    const eliminarProducto = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar este producto?"
        );

        if (!confirmar) {
            return;
        }


        try {

            setError("");

            setMensaje("");


            await api.delete(`/productos/${id}`);


            setMensaje(
                "Producto eliminado correctamente."
            );


            await cargarProductos();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.mensaje ||
                "No fue posible eliminar el producto."
            );

        }

    };


    return (
    <main className="flex-grow-1 p-4 bg-light">

        <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
                <h1 className="h3 mb-1">
                    Mantenedor de Productos
                </h1>

                <p className="text-muted mb-0">
                    Administración del catálogo de productos
                </p>
            </div>

            {!mostrarFormulario && (
                <button
                    className="btn btn-primary"
                    onClick={abrirCrear}
                >
                    + Nuevo producto
                </button>
            )}

        </div>

        {mensaje && (
            <div className="alert alert-success">
                {mensaje}
            </div>
        )}

        {error && (
            <div className="alert alert-danger">
                {error}
            </div>
        )}

        {mostrarFormulario && (
            <Form
                productoEditar={productoEditar}
                onGuardar={guardarProducto}
                onCancelar={cancelarFormulario}
            />
        )}

        {!mostrarFormulario && (
            <List
                productos={productos}
                onEditar={abrirEditar}
                onEliminar={eliminarProducto}
            />
        )}

    </main>
);

};


export default Productos;