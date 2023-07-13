import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/auth/");
  };
  return (
    <div class="navbar navbar-dark bg-dark mb-4 px-4">
      <span class="navbar-brand">
        <i class="fas fa-calendar-alt"></i>
        &nbsp; {user}
      </span>

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i class="fas fa-plus"></i>
        &nbsp; Agregar Productos
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Agregar producto
              </h1>
              <button type="button" data-bs-dismiss="modal">
                <i class="fas fa-close"></i>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
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
