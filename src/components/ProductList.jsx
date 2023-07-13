import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get("https://localhost:7262/api/productos");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProductos();
  }, []);
  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {products.map((product) => (
        <ProductCard key={product.id_producto} product={product} />
      ))}
    </div>
  );
};
