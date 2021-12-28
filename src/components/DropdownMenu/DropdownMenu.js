import classes from "./DropdownMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

export const DropdownMenu = (props) => {
  return (
    <div className={classes["dropdown-container"]} tabIndex="-1">
      <FontAwesomeIcon icon={faEllipsisH} className={classes.icon} />
      <div className={classes.dropdown}>
        <div className={classes.item} onClick={props.deletePressed}>
          Delete
        </div>
        {/* delete -> delete and go to main if rant, stay if comment */}
      </div>
    </div>
  );
};
