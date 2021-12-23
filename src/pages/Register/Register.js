import classes from "./Register.module.css";
import { app } from "../../firebase/firebase";
import { useState } from "react";
import { createUser } from "../../firebase/createUser";
import { Link } from "react-router-dom";
import { configureUsers } from "../../firebase/configureUser";
import { useDispatch } from "react-redux";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitButtonActive = userName && email && password.length >= 6;

  const createUserHandler = async (e) => {
    e.preventDefault();

    const result = await createUser(app, userName, email, password);

    if (result.error) {
      alert(result.error);
    }

    if (!result.error) {
      const setUsersData = async () => {
        const { users, userData } = await configureUsers();
        dispatch({ type: "SET_USER_DATA", payload: { ...userData } });
        dispatch({ type: "SET_USERS", payload: users });
      };

      await setUsersData();
    }
  };

  return (
    <section className={classes.register}>
      <h2>Create account</h2>
      <form className={classes["register-form"]} onSubmit={createUserHandler}>
        <div className={classes["inputs-container"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            maxLength="30"
            value={userName}
            onChange={userNameChangeHandler}
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            minLength="6"
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <button disabled={!submitButtonActive}>Sign up</button>
      </form>

      <Link to="/login" className={classes.link}>
        I have an account already
      </Link>
    </section>
  );
};

export default Register;
