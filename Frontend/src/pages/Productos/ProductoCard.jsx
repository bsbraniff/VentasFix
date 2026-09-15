const ProductoCard = ({ producto, onEditar, onEliminar }) => {

    return (
        <div className="card shadow-sm h-100">

            <div className="producto-form-body">

                <div className="d-flex justify-content-between align-items-start mb-2">

                    <div>
                        <h5 className="card-title mb-1">
                            {producto.nombre}
                        </h5>

                        <small className="text-muted">
                            SKU: {producto.sku}
                        </small>
                    </div>

                    <span className="badge bg-primary">
                        ID: {producto.id}
                    </span>

                </div>

                <p className="text-muted">
                    {producto.descripcion_corta}
                </p>

                <hr />

                <div className="mb-2">

                    <strong>Precio neto:</strong>

                    <span className="ms-2">
                        ${Number(producto.precio_neto).toLocaleString("es-CL")}
                    </span>

                </div>

                <div className="mb-2">

                    <strong>Precio venta + IVA:</strong>

                    <span className="ms-2 text-success fw-bold">
                        ${Number(producto.precio_venta).toLocaleString("es-CL")}
                    </span>

                </div>

                <div className="mb-3">

                    <strong>Stock actual:</strong>

                    <span className="ms-2">
                        {producto.stock_actual}
                    </span>

                </div>

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-warning btn-sm"
                        onClick={() => onEditar(producto)}
                    >
                        Editar
                    </button>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onEliminar(producto.id)}
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductoCard;