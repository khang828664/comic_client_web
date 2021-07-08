import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { API } from "./api-config";
import  UserInfo  from "./userComponent";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  let history = useHistory();
  const changeToLogin = () => {
    history.push("/login");
  };
  return (
    <div>
      <h1 onClick={changeToLogin}>Home</h1>
    </div>
  );
}

///
/// UserInfo

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [listPost, setListPost] = useState([]);
  const [count, setCount] = useState(0);
  const [isLogging, setIsLogin] = useState(false);
  const formData = new FormData();
  const onLogout = () => {
    setIsLogin(false);
  }
  useEffect(() => {
    return () => {};
  }, [password, username]);
  useEffect(() => {
    if (isLogging) {
      loadDataComicPost();
    }
    return () => {};
  }, [userInfo]);
  const handleLogin = async () => {
    console.log("request");
    formData.append("username", username);
    formData.append("password", password);
    try {
      let res = await axios.post(API.LOGIN, formData);
      if (res.data.result) {
        setIsLogin(true);
        setUserInfo(res.data.data);
      } else {
        setIsLogin(false);
      }
    } catch (err) {
      console.log(err.toString());
      setIsLogin(false);
    }
  };
  const loadDataComicPost = async () => {
    console.log("load comic post");
    console.log(userInfo._id);
    formData.append("_idUser", userInfo._id.toString());
    try {
      let res = await axios.post(API._IDUSER, formData);
      console.log(res);
      setListPost(res.data.data);
    } catch (err) {
      console.log(err.toString());
    }
  };
  return (
    <div>
      {!isLogging ? (
        <div>
          <form id="loginForm" name="loginForm">
            <p>Login:</p>
            <div>
              <p>Username :</p>
              <input
                type="text"
                onChange={(data) => setUsername(data.target.value)}
              />
            </div>
            <div>
              <p>Password :</p>
              <input
                type="password"
                onChange={(data) => setPassword(data.target.value)}
              />
            </div>
          </form>
          <button onClick={() => handleLogin()}>Submit</button>
        </div>
      ) : (
        <div>
          <UserInfo 
          userData={userInfo} 
          dataComic={listPost}
          onChange={()=>console.log("change")}
          />
           <button type="button" onClick={() => onLogout()}>
                  Logout
            </button>
        </div>
      )}
    </div>
  );
}
