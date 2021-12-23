import { useState } from "react";
import classes from "./ToggleRants.module.css";

const ToggleRants = (props) => {
  const [allRantsChecked, setAllRantsChecked] = useState(false);
  const areAllRantsChecked = props.areAllRantsChecked;

  const allRantsHandler = () => {
    setAllRantsChecked(true);
    areAllRantsChecked(true);
  };

  const followedUsersHandler = () => {
    setAllRantsChecked(false);
    areAllRantsChecked(false);
  };

  return (
    <div className={classes["toggle-rants"]}>
      <div
        className={`${classes["button-appearance"]} ${
          allRantsChecked && classes["button-checked"]
        }`}
        onClick={allRantsHandler}
      >
        All Rants
      </div>
      <div
        className={`${classes["button-appearance"]} ${
          !allRantsChecked && classes["button-checked"]
        }`}
        onClick={followedUsersHandler}
      >
        Followed Users
      </div>
    </div>
  );
};

export default ToggleRants;
