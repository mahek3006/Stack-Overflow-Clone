import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Chatbot from "./components/ChatBot/Chatbot";
import AllRoutes from "./AllRoutes";

import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { fetchAllPosts } from "./actions/post";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
        {/* <Chatbot /> */}
      </Router>
    </div>
  );
}

export default App;
