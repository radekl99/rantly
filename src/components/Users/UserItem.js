import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AuthContext from "../../context/auth-context";
import classes from "./UserItem.module.css";

const UserItem = (props) => {
  const currentUserData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const userData = props.user;

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  let isUserFollowed = false;
  if (currentUserData.follows) {
    isUserFollowed = currentUserData.follows.includes(userData.userId);
  }

  const followChangeHandler = () => {
    if (isUserFollowed) {
      dispatch({ type: "UNFOLLOW", payload: { userId: userData.userId } });
    }
    if (!isUserFollowed) {
      dispatch({ type: "FOLLOW", payload: { userId: userData.userId } });
    }
  };

  const goToProfileHandler = () => {
    history.push(`/profile/${userData.userId}`);
  };

  return (
    <li className={classes["user-item"]}>
      <div className={classes["user-data"]}>
        <div className={classes["user-details"]} onClick={goToProfileHandler}>
          <img
            src={userData.photoURL || authCtx.angryIcon}
            alt={userData.username}
          />
          <h2>{userData.username}</h2>
        </div>
        {props.showAbout && userData.about && (
          <p className={classes.about}>{userData.about}</p>
        )}
      </div>
      {userData.userId !== currentUserData.userId && (
        <label className={classes["follow-button"]}>
          <input
            type="checkbox"
            checked={isUserFollowed}
            onChange={followChangeHandler}
          />
          <div className={classes["follow-button-appearance"]}>
            {isUserFollowed ? "Unfollow" : "Follow"}
          </div>
        </label>
      )}
    </li>
  );
};

export default UserItem;
