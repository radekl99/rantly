import classes from "./Backdrop.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={props.onClick}></div>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
