import React, { useEffect } from "react";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { checkAuthentication } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
import "../../components/CommunityNavbar/Community.css";
import PostList from "../../components/CommunityNavbar/PostList";

const Community = () => {
  const { id } = useParams();
  const postsList = useSelector((state) => state.postsReducer);

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
      <LeftSidebar />
      <div className="home-container-2">
        <div className="main-feed-page">
          <h1>Post Details</h1>
          <div>
            {postsList.data === null ? (
              <h1>Loading...</h1>
            ) : postsList.data.find((post) => post._id === id) ? (
              <>
                <PostList
                  postsList={postsList.data.filter((post) => post._id === id)}
                />
              </>
            ) : (
              <h2>Post with Id: ${id} not found</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Community;
