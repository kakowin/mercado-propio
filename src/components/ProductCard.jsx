
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../cart/cartSlice";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import { HandleDeleteContext } from "../pages/AdminDashboard";


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
  

  const BotonProducto = () => {
    if (rol == "cliente") {
    
      return (

        <div>
            <button
            className="btn btn-info w-100"
            data-toggle="modal"
            data-target="#editModal"
            onClick={handleAddToCart}
            >
            comprar
            </button>
        </div>
      );
    } else {
    const handleDelete = useContext(HandleDeleteContext);
      return (
        <div>
            <div>
                <button
                    className="btn btn-info w-100"
                    data-toggle="modal"
                    data-target="#editModal"
                    onClick={handleEdit}
                    >
                    Editar
                </button>
            </div>
            <div>
                <button
                    className="btn btn-danger w-100"
                    data-toggle="modal"
                    data-target="#deleteModal"
                    onClick={() => handleDelete(product.id_producto)}
                    >
                    Eliminar 
                </button>
            </div>

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



