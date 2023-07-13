import axios from "axios";
import { logOut, loginSuccess, startLogin } from "./authSlice";
import jwt_decode from "jwt-decode";

export const startChekingThunk = (user, password) => {
  return async (dispatch) => {
    dispatch(startLogin());
  };
};

export const startLoginThunk = ({ user, password }) => {
  return async (dispatch) => {
    dispatch(startLogin());

    try {
      const response = await axios.post("https://localhost:7262/api/login", {
        usuario: user,
        contrasena: password,
      });

      const { token } = response.data;
      const decodedToken = jwt_decode(token);

      const rol =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const userName =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];

      dispatch(loginSuccess({ user: userName, token, rol }));
      localStorage.setItem(
        "user",
        JSON.stringify({ user: userName, token, rol })
      );
    } catch (error) {
      dispatch(logOut({ error: error.message }));
    }
  };
};

export const startRegisterThunk = ({ user2, password2 }) => {
  return async (dispatch) => {
    dispatch(startLogin());

    try {
      const response = await axios.post("https://localhost:7262/api/register", {
        usuario: user2,
        contrasena: password2,
      });

      dispatch(startLoginThunk({ user: user2, password: password2 }));
    } catch (error) {
      console.log(error);
    }
  };
};
