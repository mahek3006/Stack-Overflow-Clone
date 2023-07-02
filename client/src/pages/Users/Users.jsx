import React, { useEffect } from "react";

import LeftSideBar from "../../components/LeftSidebar/LeftSidebar";
import UsersList from "./UsersList";
import { checkAuthentication } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";

const Users = () => {
  const user = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authUser = checkAuthentication(user);
    if (!authUser) {
      user && alert("Session Timed Out!");
      dispatch({ type: "LOGOUT" });
      navigate(location.pathname);
      dispatch(setCurrentUser(null));
    }
  }, [dispatch, location.pathname, navigate, user]);

  return (
    <div className="home-container-1">
      <LeftSideBar />

      <div className="home-container-2">
        <h1
          style={{ marginTop: "50px", fontWeight: "400" }}
          className="User-head"
        >
          Users
        </h1>
        <UsersList />
      </div>
    </div>
  );
};

export default Users;
