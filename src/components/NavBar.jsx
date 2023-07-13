import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { useState } from "react";

export const NavBar = () => {
  const { nombre, precio, descripcion, onInputChange, formState, onResetForm } =
    useForm({
      nombre: "",
      precio: "",
      descripcion: "",
    });

  const [api, setApi] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/auth/");
  };

  const handleNewProduct = async (e) => {
    e.preventDefault();
    try {
      let formCopy = { ...formState };
      formCopy.precio =
        formCopy.precio !== "" ? parseFloat(formCopy.precio) : 0;

      const imageData = new FormData();
      imageData.append("file", selectedFile);
      imageData.append("upload_preset", "zkux5esh"); // Reemplaza con tu preset de Cloudinary
      const imageResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/du7j9fiti/image/upload",
        imageData
      ); // Reemplaza con tu Cloud name

      formCopy.imagen = imageResponse.data.secure_url;
      const { data, status } = await axios.post(
        "https://localhost:7262/api/producto",
        formCopy
      );
      if (status == 200) {
        setApi(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {user}
      </span>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fas fa-plus"></i>
        &nbsp; Agregar Productos
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Agregar producto
              </h1>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i className="fas fa-close"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="precio"
                  placeholder="Precio"
                  value={precio}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <textarea
                  className="form-control"
                  name="descripcion"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={onInputChange}
                ></textarea>
              </div>
              <div className="mb-2">
                <input
                  type="file"
                  id="formFile"
                  name="imagen"
                  onChange={handleFileInputChange}
                />
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="Imagen seleccionada"
                    style={{
                      marginTop: "10px",
                      maxWidth: "200px",
                      height: "auto",
                    }} // ajusta "maxWidth" a la anchura que quieras
                  />
                )}
              </div>
              {api && (
                <div className="success alert-primary" role="alert">
                  Producto creado correctamente
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={onResetForm}
              >
                Borrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNewProduct}
              >
                Agregar Producto
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-outline-danger" onClick={handleLogOut}>
        <i className="fas fa-sign-out-alt mr-1"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
