import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const ModalBody = (props) => {
  const { onCancelDelete, onConfirmDelete } = props;
  return (
    <div className={classes["modal-container"]}>
      <div className={classes.modal}>
        <div className={classes["modal-header"]}>
          <h2>Are you sure?</h2>
        </div>
        <div className={classes["modal-message"]}>
          <p>This operation cannot be undone. Would you like to proceed?</p>
        </div>
        <div className={classes["modal-buttons"]}>
          <button
            className={classes["confirm-button"]}
            onClick={onConfirmDelete}
          >
            Yes
          </button>
          <button className={classes["cancel-button"]} onClick={onCancelDelete}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export const Modal = (props) => {
  return ReactDOM.createPortal(
    <ModalBody
      onCancelDelete={props.onCancelDelete}
      onConfirmDelete={props.onConfirmDelete}
    />,
    document.getElementById("modal-root")
  );
};
