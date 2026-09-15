import ProductoCard from "./ProductoCard";

const List = ({ productos, onEditar, onEliminar }) => {

    if (productos.length === 0) {

        return (
            <div className="productos-list-header">
                <h5>Productos registrados</h5>
            </div>
        );

    }

    return (

        <div className="row g-4">

            {productos.map((producto) => (

                <div
                    className="col-12 col-md-6 col-xl-4"
                    key={producto.id}
                >

                    <ProductoCard
                        producto={producto}
                        onEditar={onEditar}
                        onEliminar={onEliminar}
                    />

                </div>

            ))}

        </div>

    );
};

export default List;