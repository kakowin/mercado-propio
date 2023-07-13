import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../cart/cartSlice";

export const ProductCard = ({ product }) => {
  const { rol } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const handleEdit = () => {};

  const BotonProducto = () => {
    if (rol == "cliente") {
      return (
        <button
          className="btn btn-info w-100"
          data-toggle="modal"
          data-target="#editModal"
          onClick={handleAddToCart}
        >
          comprar
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-info w-100"
          data-toggle="modal"
          data-target="#editModal"
          onClick={handleEdit}
        >
          Editar
        </button>
      );
    }
  };
  return (
    <div
      className="col animate__animated animate__fadeIn mb-4 ml-4"
      style={{ maxWidth: "18rem" }}
    >
      <div className="card h-100">
        <img
          src={product.imagen}
          className="card-img-top img-fluid"
          alt="imagen de producto"
          style={{ objectFit: "cover", height: "20rem" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.nombre}</h5>
          <p className="card-text">
            <span>Descripcion: </span>
            {product.descripcion}
          </p>
          <h6 className="card-text mt-2">
            <strong>Precio: </strong>${product.precio}
          </h6>

          <BotonProducto />
        </div>
      </div>
    </div>
  );
};
