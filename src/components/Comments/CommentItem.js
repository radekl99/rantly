import classes from "./CommentItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../context/auth-context";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import Backdrop from "../Backdrop/Backdrop";
import { Modal } from "../Modal/Modal";

const CommentItem = (props) => {
  const userData = useSelector((state) => state.userData);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const { comment, likes, rantId, commentId } = props.commentData;

  const commentAuthor = users.find(
    (user) => user.userId === props.commentData.userId
  );

  let isCommentLiked = false;

  if (likes) {
    isCommentLiked = likes.includes(userData.userId);
  }

  const likeCommentChangeHandler = () => {
    if (isCommentLiked) {
      dispatch({ type: "UNLIKE_COMMENT", payload: { rantId, commentId } });
    }
    if (!isCommentLiked) {
      dispatch({ type: "LIKE_COMMENT", payload: { rantId, commentId } });
    }
  };

  const goToUserProfile = () => {
    history.push(`/profile/${props.commentData.userId}`);
  };

  const angryIcon = authCtx.angryIcon;

  const deleteCommentPressHandler = () => {
    setShowModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowModal(false);
  };

  const confirmDeleteHandler = () => {
    dispatch({ type: "DELETE_COMMENT", payload: { rantId, commentId } });
  };

  return (
    <React.Fragment>
      <li className={classes["comment-item"]}>
        <div className={classes["user-data"]} onClick={goToUserProfile}>
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
        <div className={classes["like-container"]}>
          <label className={classes["like-comment-button"]}>
            <input
              type="checkbox"
              onChange={likeCommentChangeHandler}
              checked={isCommentLiked}
            />

            <FontAwesomeIcon icon={faAngry} className={classes["angry-icon"]} />
          </label>
          <div className={classes.likes}>{likes?.length || "0"}</div>
        </div>
        {userData.userId === props.commentData.userId && (
          <DropdownMenu deletePressed={deleteCommentPressHandler} />
        )}
      </li>
      {showModal && <Backdrop />}
      {showModal && (
        <Modal
          onCancelDelete={cancelDeleteHandler}
          onConfirmDelete={confirmDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default CommentItem;
