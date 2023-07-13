import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../cart/cartSlice";
import axios from "axios";
import { useForm } from "../hooks/useForm";

export const ProductCard = ({ product }) => {
  const { rol } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { nombre, precio, descripcion, onInputChange, formState, onResetForm } =
    useForm({
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
    });

  const [api, setApi] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };
  const handleEdit = () => {};
  const handleDelete = async () => {
    await axios.delete(
      `https://localhost:7262/api/producto/${product.id_producto}`
    );
    console.log(product.id_producto);
  };

  const BotonProducto = () => {
    if (rol == "cliente") {
      return (
        <button className="btn btn-info w-100" onClick={handleAddToCart}>
          comprar
        </button>
      );
    } else {
      return (
        <div>
          <button className="btn btn-info w-75 mt-2" onClick={handleEdit}>
            Editar
          </button>
          <button className="btn btn-danger w-100 mt-2" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      );
    }
  };
  return (
    <>
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
    </>
  );
};
