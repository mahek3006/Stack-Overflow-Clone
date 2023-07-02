import React from "react";
import PostList from "./PostList";
import "./Community.css";
import { Icon } from "@iconify/react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthentication } from "../../actions/auth";
import { setCurrentUser } from "../../actions/currentUser";

const CommunityFeed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const postsList = useSelector((state) => state.postsReducer);

  const checkAuth = () => {
    const authUser = checkAuthentication(user);
    if (authUser) {
      navigate("/CreatePost");
    } else {
      dispatch({ type: "LOGOUT" });
      alert("Login or SignUp required to Post");
      dispatch(setCurrentUser(null));
      navigate("/Auth");
    }
  };

  return (
    <div className="main-feed-page">
      <h1>
        Community Feed
        <Icon
          icon="ion:create-outline"
          className="community-post icon-post"
          onClick={checkAuth}
        />
      </h1>
      <div>
        {postsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <PostList postsList={postsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
