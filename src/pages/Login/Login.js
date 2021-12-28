import classes from "./Login.module.css";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInUser } from "../../firebase/signInUser";
import { app } from "../../firebase/firebase";
import { getRedirectResult, getAuth } from "@firebase/auth";
import { signInWithGoogle } from "../../firebase/signInWithGoogle";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);

  useEffect(() => authCtx.onLoginClicked(), [authCtx]);

  const auth = getAuth(app);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitButtonActive = email && password;

  const signInUserHandler = async (e) => {
    e.preventDefault();

    const result = await signInUser(app, email, password);

    if (result.error) {
      alert(result.error);
    }
  };

  const signInWithGoogleHandler = () => {
    signInWithGoogle(app);
  };
  getRedirectResult(auth);

  return (
    <section className={classes.login}>
      <h2>Login</h2>
      <form className={classes["login-form"]} onSubmit={signInUserHandler}>
        <div className={classes["inputs-container"]}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            value={password}
          />
        </div>
        <button disabled={!submitButtonActive}>Sign in</button>
      </form>
      <GoogleButton
        onClick={signInWithGoogleHandler}
        className={classes["google-button"]}
        type="light"
      />
      <Link to="/register" className={classes.link}>
        I don't have an account yet
      </Link>
    </section>
  );
};

export default Login;
