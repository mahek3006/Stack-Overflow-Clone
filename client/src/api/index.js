import axios from "axios";

const API = axios.create({
  baseURL: "https://stackoverflow-hm-be.onrender.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req; //Based on the Axios Documentation - Interceptors, the interceptor function should return the req
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/askQuestion", questionData);
export const getAllQuestion = () => API.get("/questions/getAllQuestions");
export const deleteQuestion = (id) =>
  API.delete(`/questions/deleteQuestion/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/voteQuestion/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/postAnswer/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/deleteAnswer/${id}`, { answerId, noOfAnswers });

export const fetchAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/updateUser/${id}`, updateData);
export const BecomeFriend = (id, value, userId) =>
  API.patch(`/user/beFriends/${id}`, { value, userId });

export const sharePost = (postData) => API.post("/posts/createPost", postData);
export const getsAllPost = () => API.get("/posts/getAllPosts");
export const postLiked = (id, value, userId) =>
  API.patch(`/posts/likedPost/${id}`, { value, userId });
