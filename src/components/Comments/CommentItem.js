import classes from "./CommentItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const CommentItem = (props) => {
  const userData = useSelector((state) => state.userData);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);

  const { comment, likes, rantId, commentId } = props.commentData;

  const commentAuthor = users.find(
    (user) => user.userId === props.commentData.userId
  );

  let isCommentLiked = false;

  if (userData.likedComments) {
    isCommentLiked = userData.likedComments.includes(
      props.commentData.commentId
    );
  }

  const likeCommentChangeHandler = () => {
    if (isCommentLiked) {
      dispatch({ type: "UNLIKE_COMMENT", payload: { rantId, commentId } });
    }
    if (!isCommentLiked) {
      dispatch({ type: "LIKE_COMMENT", payload: { rantId, commentId } });
    }
  };

  const angryIcon = authCtx.angryIcon;

  return (
    <li className={classes["comment-item"]}>
      <div className={classes["comment-container"]}>
        <div className={classes["user-data"]}>
          <img
            src={
              commentAuthor && commentAuthor.photoURL
                ? commentAuthor.photoURL
                : angryIcon
            }
            alt={commentAuthor ? commentAuthor.username : ""}
          />
          <h2>{commentAuthor ? commentAuthor.username : ""}</h2>
        </div>
        <p className={classes.comment}>{comment}</p>
      </div>
      <div className={classes["like-container"]}>
        <label className={classes["like-comment-button"]}>
          <input
            type="checkbox"
            onChange={likeCommentChangeHandler}
            checked={isCommentLiked}
          />

          <FontAwesomeIcon icon={faAngry} className={classes["angry-icon"]} />
        </label>
        <div className={classes.likes}>{likes}</div>
      </div>
    </li>
  );
};

export default CommentItem;
