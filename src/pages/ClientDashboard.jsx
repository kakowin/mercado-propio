import React from "react";
import { ProductList } from "../components/ProductList";
import { NavBarCliente } from "../components/NavBarCliente";

export const ClientDashboard = () => {
  return (
    <>
      <NavBarCliente />
      <ProductList />
    </>
  );
};
