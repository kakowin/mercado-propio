import { Route, Routes, useNavigate } from "react-router-dom";
import {
  LoginPage,
  AdminDashboard,
  ClientDashboard,
  NewProduct,
} from "./pages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { logOut, loginSuccess } from "./auth/authSlice";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.token) {
      const decodedToken = jwt_decode(userData.token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("user");
        dispatch(logOut());
        navigate("/auth");
      } else {
        dispatch(loginSuccess(userData));
      }
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/auth/*" element={<LoginPage />} />
      <Route path="/admin/*" element={<PrivateRoute roles={["admin"]} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="new-product" element={<NewProduct />} />
      </Route>
      <Route path="/*" element={<ClientDashboard />} />
    </Routes>
  );
}

export default App;
