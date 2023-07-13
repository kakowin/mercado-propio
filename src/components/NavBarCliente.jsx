import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../auth/authSlice";

export const NavBarCliente = () => {
  const navigate = useNavigate();
  const itemsCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/auth/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Mi Tienda
      </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <i className="fa fa-shopping-cart"></i> Carrito
              {itemsCount > 0 && (
                <span className="badge badge-light ml-1">{itemsCount}</span>
              )}
            </a>
          </li>
          <button className="btn btn-outline-danger" onClick={handleLogOut}>
            <i className="fas fa-sign-out-alt mr-1"></i>
            <span>Salir</span>
          </button>
        </ul>
      </div>
    </nav>
  );
};
