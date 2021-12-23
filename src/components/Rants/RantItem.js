import classes from "./RantItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AuthContext from "../../context/auth-context";

const RantItem = (props) => {
  const userData = useSelector((state) => state.userData);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const rantData = props.rantData || {};

  const rantAuthor = users.find((user) => user.userId === rantData.userId);

  let isRantLiked = false;

  if (rantData.likes) {
    isRantLiked = rantData.likes.includes(userData.userId);
  }

  const likeRantChangeHandler = () => {
    if (isRantLiked) {
      dispatch({ type: "UNLIKE_RANT", payload: rantData.rantId });
    }
    if (!isRantLiked) {
      dispatch({ type: "LIKE_RANT", payload: rantData.rantId });
    }
  };

  const commentHandler = () => {
    history.push(`/comments/${rantData.rantId}`);
  };

  const goToUserProfilePage = () => {
    history.push(`/profile/${rantAuthor.userId}`);
  };

  return (
    <li className={classes["rant-item"]}>
      <div className={classes["user-data"]} onClick={goToUserProfilePage}>
        <img
          src={
            rantAuthor && rantAuthor.photoURL
              ? rantAuthor.photoURL
              : authCtx.angryIcon
          }
          alt={rantAuthor ? rantAuthor.username : ""}
        />
        <h2>{rantAuthor ? rantAuthor.username : ""}</h2>
      </div>
      <p className={classes.rant}>{rantData.rant}</p>
      <div className={classes["buttons-container"]}>
        <div className={classes["like-container"]}>
          <label className={classes["like-rant-button"]}>
            <input
              type="checkbox"
              checked={isRantLiked}
              onChange={likeRantChangeHandler}
            />

            <FontAwesomeIcon icon={faAngry} className={classes["angry-icon"]} />
          </label>
          <div className={classes.likes}>{rantData.likes?.length || "0"}</div>
        </div>
        <div className={classes["comment-container"]}>
          <button
            className={classes["comment-button"]}
            onClick={commentHandler}
          >
            <FontAwesomeIcon
              icon={faCommentAlt}
              className={classes["comment-icon"]}
            />
          </button>
          <div className={classes.comments}>
            {rantData.comments ? rantData.comments.length : "0"}
          </div>
        </div>
      </div>
    </li>
  );
};

export default RantItem;
