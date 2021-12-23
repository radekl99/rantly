import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import classes from "./Header.module.css";
import { useContext, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import AuthContext from "../../context/auth-context";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const authCtx = useContext(AuthContext);
  const auth = getAuth(app);

  const history = useHistory();

  const userData = useSelector((state) => state.userData);

  const showNavHandler = () => {
    setShowNav(true);
  };

  const hideNavHandler = () => {
    setShowNav(false);
  };

  const logoutHandler = () => {
    history.replace("/");
    setShowNav(false);
    signOut(auth);
    authCtx.onLogout();
  };

  const goToProfileHandler = () => {
    history.push(`/profile/${auth.currentUser.uid}`);
    setShowNav(false);
  };

  const goToRantsHandler = () => {
    history.push("/main");
    setShowNav(false);
  };

  const goToSearchHandler = () => {
    history.push("/search");
    setShowNav(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.profile}>
        {authCtx.isLoggedIn && (
          <img
            src={userData.photoURL || authCtx.angryIcon}
            alt={auth.currentUser.displayName}
            title={auth.currentUser.displayName}
            referrerPolicy="no-referrer"
            onClick={goToProfileHandler}
          />
        )}
      </div>

      <Link to={authCtx.isLoggedIn ? "/main" : "/"} className={classes.title}>
        <h1>Rantly</h1>
      </Link>

      <div className={classes.menu}>
        {authCtx.isLoggedIn && (
          <FontAwesomeIcon
            icon={faBars}
            onClick={showNavHandler}
            className={classes.icon}
          />
        )}
        {!authCtx.isLoggedIn && (
          <Link to="/login" className={classes.login}>
            Login
          </Link>
        )}
      </div>
      {showNav && <Backdrop onClick={hideNavHandler} />}
      <ul
        className={`${classes["navigation"]} ${showNav && classes["show-nav"]}`}
      >
        <FontAwesomeIcon
          icon={faTimes}
          className={classes["hide-nav"]}
          onClick={hideNavHandler}
        />
        <li onClick={goToProfileHandler}>Profile</li>
        <div className={classes.division}></div>
        <li onClick={goToRantsHandler}>Rants</li>
        <div className={classes.division}></div>
        <li onClick={goToSearchHandler}>Search</li>
        <div className={classes.division}></div>
        <li onClick={logoutHandler}>Logout</li>
      </ul>
    </header>
  );
};

export default Header;
