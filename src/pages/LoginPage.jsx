import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.css";
import { useEffect, useState } from "react";
import { startLoginThunk, startRegisterThunk } from "../auth/authThunk";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [user2, setUser2] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, rol } = useSelector((state) => state.auth);

  const isAuthenticating = isLoading === true;

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(startLoginThunk({ user, password }));
    console.log(user, password);
  };

  useEffect(() => {
    if (rol === "admin") {
      navigate("/admin/");
    } else if (rol) {
      navigate("/");
    }
  }, [rol, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(startRegisterThunk({ user2, password2 }));
    navigate("/");
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isAuthenticating && error && (
              <div className="alert alert-danger" role="alert">
                Usuario o contraseña incorrectos
              </div>
            )}

            <div className="form-group mb-2">
              <button
                type="submit"
                className="btn btnSubmit"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={user2}
                onChange={(e) => setUser2(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group mb-2">
              <button
                type="submit"
                className="btn btnSubmit"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></div>
                ) : (
                  "Registrase"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
