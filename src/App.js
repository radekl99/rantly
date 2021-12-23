import Header from "./components/Header/Header";
import Comments from "./pages/Comments/Comments";
import EditProfile from "./pages/EditProfile/EditProfile";
import Followers from "./pages/Followers/Followers";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import StartPage from "./pages/StartPage/StartPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase/firebase";
import { useContext } from "react";
import AuthContext from "./context/auth-context";
import { Switch, Route } from "react-router";
import { useDispatch } from "react-redux";
import { getDatabase, ref, get } from "firebase/database";
import { configureUsers } from "./firebase/configureUser";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./components/Loading/Loading";

const App = () => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const auth = getAuth(app);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.displayName) {
      setIsLoading(true);

      const database = getDatabase(app);

      //RANTS FROM DATABASE
      get(ref(database, "rants")).then((snapshot) => {
        if (snapshot.exists()) {
          const rants = snapshot.val();
          dispatch({ type: "SET_RANTS", payload: { rants: rants } });
        }
      });

      const setUsersData = async () => {
        const { users, userData } = await configureUsers();
        dispatch({ type: "SET_USER_DATA", payload: { ...userData } });
        dispatch({ type: "SET_USERS", payload: users });
        setIsLoading(false);
      };

      setUsersData();
    }
  }, [auth.currentUser, auth.currentUser?.displayName, dispatch]);

  //CHECKING IF SOME USER IS LOGGED IN
  onAuthStateChanged(auth, (user) => {
    if (user) {
      authCtx.onLogin();

      if (location.pathname === "/login" || location.pathname === "/register") {
        history.replace("/main");
      }
    }
    if (!user) {
      authCtx.onLogout();
    }
  });

  authCtx.setAngryIcon();

  return (
    <div>
      <Header />
      {isLoading && <Loading />}
      <Switch>
        <Route exact path="/" component={StartPage} />
        {authCtx.isLoggedIn && (
          <Route exact path="/profile/:userId" component={Profile} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/comments/:rantId" component={Comments} />
        )}
        {authCtx.isLoggedIn && <Route exact path="/main" component={Main} />}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {authCtx.isLoggedIn && (
          <Route exact path="/search" component={Search} />
        )}
        {authCtx.isLoggedIn && (
          <Route exact path="/followers/:userId" component={Followers} />
        )}
        {authCtx.isLoggedIn && (
          <Route exact path="/edit" component={EditProfile} />
        )}
        <Route path="*">
          {!authCtx.isLoggedIn && <StartPage />}
          {authCtx.isLoggedIn && <Main />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
