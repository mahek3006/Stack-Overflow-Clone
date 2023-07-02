import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import decode from "jwt-decode";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthentication = (user) => {
  if (!user) {
    return false;
  } else {
    const token = user.token;
    const decodedToken = decode(token);
    return decodedToken.exp * 1000 >= new Date().getTime();
  }
};
