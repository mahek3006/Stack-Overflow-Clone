import React from "react";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import CommunityFeed from "../../components/CommunityNavbar/CommunityFeed";

const Community = () => {
  // const user = useSelector((state) => state.currentUserReducer);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   const authUser = checkAuthentication(user);
  //   if (!authUser) {
  //     user && alert("Session Timed Out!");
  //     dispatch({ type: "LOGOUT" });
  //     navigate(location.pathname);
  //     dispatch(setCurrentUser(null));
  //   }
  // }, [dispatch, location.pathname, navigate, user]);

  return (
    <div className="home-container-1">
      <LeftSidebar />

      <div className="home-container-2">
        <CommunityFeed />
        <RightSidebar />
      </div>
    </div>
  );
};
export default Community;
