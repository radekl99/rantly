import { useHistory } from "react-router";
import classes from "./StartPage.module.css";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const StartPage = () => {
  const history = useHistory();

  const goToLoginHandler = () => {
    history.push("/login");
  };

  const authCtx = useContext(AuthContext);

  const angryIcon = authCtx.angryIcon;

  return (
    <section className={classes.home}>
      <img className={classes.image} src={angryIcon} alt="Angry icon" />
      <div className={classes.description}>
        <h1>Rantly</h1>
        <h2>
          Tell everyone what makes you <span>angry!</span>
        </h2>
        <button className={classes["join-button"]} onClick={goToLoginHandler}>
          Let's go!
        </button>
      </div>
    </section>
  );
};

export default StartPage;
