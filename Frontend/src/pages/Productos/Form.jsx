import { useEffect, useState } from "react";

const Form = ({ productoEditar, onGuardar, onCancelar }) => {

    const [formulario, setFormulario] = useState({
        sku: "",
        nombre: "",
        descripcion_corta: "",
        descripcion_larga: "",
        imagen: "",
        precio_neto: "",
        stock_actual: "",
        stock_minimo: "",
        stock_bajo: "",
        stock_alto: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {

        if (productoEditar) {

            setFormulario({
                sku: productoEditar.sku || "",
                nombre: productoEditar.nombre || "",
                descripcion_corta: productoEditar.descripcion_corta || "",
                descripcion_larga: productoEditar.descripcion_larga || "",
                imagen: productoEditar.imagen || "",
                precio_neto: productoEditar.precio_neto || "",
                stock_actual: productoEditar.stock_actual || "",
                stock_minimo: productoEditar.stock_minimo || "",
                stock_bajo: productoEditar.stock_bajo || "",
                stock_alto: productoEditar.stock_alto || ""
            });

        } else {

            setFormulario({
                sku: "",
                nombre: "",
                descripcion_corta: "",
                descripcion_larga: "",
                imagen: "",
                precio_neto: "",
                stock_actual: "",
                stock_minimo: "",
                stock_bajo: "",
                stock_alto: ""
            });

        }

        setError("");

    }, [productoEditar]);


    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });

    };


    const manejarSubmit = (e) => {

        e.preventDefault();

        setError("");

        const campos = Object.values(formulario);

        const hayCamposVacios = campos.some(
            (campo) => String(campo).trim() === ""
        );

        if (hayCamposVacios) {

            setError("Todos los campos son obligatorios.");

            return;
        }


        const precioNeto = Number(formulario.precio_neto);

        if (precioNeto <= 0) {

            setError("El precio neto debe ser mayor que 0.");

            return;
        }


        const stockActual = Number(formulario.stock_actual);
        const stockMinimo = Number(formulario.stock_minimo);
        const stockBajo = Number(formulario.stock_bajo);
        const stockAlto = Number(formulario.stock_alto);


        if (
            stockActual < 0 ||
            stockMinimo < 0 ||
            stockBajo < 0 ||
            stockAlto < 0
        ) {

            setError("Los valores de stock no pueden ser negativos.");

            return;
        }


        if (stockMinimo > stockBajo) {

            setError(
                "El stock mínimo no puede ser mayor que el stock bajo."
            );

            return;
        }


        if (stockBajo > stockAlto) {

            setError(
                "El stock bajo no puede ser mayor que el stock alto."
            );

            return;
        }


        onGuardar({

            ...formulario,

            precio_neto: precioNeto,

            stock_actual: stockActual,

            stock_minimo: stockMinimo,

            stock_bajo: stockBajo,

            stock_alto: stockAlto

        });

    };


    const precioVenta = formulario.precio_neto
        ? Number(formulario.precio_neto) * 1.19
        : 0;


    return (

        <div className="producto-form-card">
            <div className="producto-form-header">

                <h5 className="mb-0">

                    {productoEditar
                        ? "Editar producto"
                        : "Crear producto"}

                </h5>

            </div>


            <div className="producto-form-body">

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                <form onSubmit={manejarSubmit}>

                    <div className="row g-3">

                        <div className="col-md-4">

                            <label className="form-label producto-label">
                                SKU
                            </label>

                            <input
                                type="text"
                                className="form-control producto-input"
                                name="sku"
                                value={formulario.sku}
                                onChange={manejarCambio}
                            />

                        </div>


                        <div className="col-md-8">

                            <label className="form-label producto-label">
                                Nombre
                            </label>

                            <input
                                type="text"
                                className="form-control producto-input"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={manejarCambio}
                            />

                        </div>


                        <div className="col-12">

                            <label className="form-label producto-label">
                                Descripción corta
                            </label>

                            <input
                                type="text"
                                className="form-control producto-input"
                                name="descripcion_corta"
                                value={formulario.descripcion_corta}
                                onChange={manejarCambio}
                            />

                        </div>


                        <div className="col-12">

                            <label className="form-label producto-label">
                                Descripción larga
                            </label>

                            <textarea
                                className="form-control producto-input"
                                name="descripcion_larga"
                                rows="3"
                                value={formulario.descripcion_larga}
                                onChange={manejarCambio}
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label producto-label">
                                Imagen
                            </label>

                            <input
                                type="text"
                                className="form-control producto-input"
                                name="imagen"
                                value={formulario.imagen}
                                onChange={manejarCambio}
                                placeholder="nombre-imagen.jpg"
                            />

                        </div>


                        <div className="col-md-3">

                            <label className="form-label producto-label">
                                Precio neto
                            </label>

                            <input
                                type="number"
                                className="form-control producto-input"
                                name="precio_neto"
                                value={formulario.precio_neto}
                                onChange={manejarCambio}
                                min="0"
                                step="0.01"
                            />

                        </div>


                        <div className="col-md-3">

                            <label className="form-label producto-label">
                                Precio venta + IVA
                            </label>

                            <input
                                type="text"
                                className="form-control bg-light"
                                value={
                                    precioVenta > 0
                                        ? `$${precioVenta.toLocaleString("es-CL")}`
                                        : ""
                                }
                                readOnly
                            />

                            <small className="text-muted">
                                IVA incluido: 19%
                            </small>

                        </div>


                        <div className="col-md-3">

                            <label className="form-label producto-label">
                                Stock actual
                            </label>

                            <input
                                type="number"
                                className="form-control producto-input"
                                name="stock_actual"
                                value={formulario.stock_actual}
                                onChange={manejarCambio}
                                min="0"
                            />

                        </div>


                        <div className="col-md-3">

                            <label className="form-label producto-label">
                                Stock mínimo
                            </label>

                            <input
                                type="number"
                                className="form-control producto-input"
                                name="stock_minimo"
                                value={formulario.stock_minimo}
                                onChange={manejarCambio}
                                min="0"
                            />

                        </div>


                        <div className="col-md-3">

                            <label className="form-label producto-label">
                                Stock bajo
                            </label>

                            <input
                                type="number"
                                className="form-control producto-input"
                                name="stock_bajo"
                                value={formulario.stock_bajo}
                                onChange={manejarCambio}
                                min="0"
                            />

                        </div>


                        <div className="col-md-3">

                            <label className="form-label producto-label">
                                Stock alto
                            </label>

                            <input
                                type="number"
                                className="form-control producto-input"
                                name="stock_alto"
                                value={formulario.stock_alto}
                                onChange={manejarCambio}
                                min="0"
                            />

                        </div>

                    </div>


                    <div className="mt-4 d-flex gap-2">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {productoEditar
                                ? "Actualizar producto"
                                : "Guardar producto"}
                        </button>


                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancelar}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};

export default Form;