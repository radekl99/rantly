import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import RantItem from "../../components/Rants/RantItem";
import classes from "./Comments.module.css";
import CommentsList from "../../components/Comments/CommentsList";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Comments = () => {
  const { rantId } = useParams();
  const commentRef = useRef();
  const dispatch = useDispatch();
  const rants = useSelector((state) => state.rants);

  let rant;
  if (rants) {
    rant = rants.find((rant) => rant.rantId === rantId);
  }

  const commentSubmitHandler = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_COMMENT",
      payload: {
        id: rantId,
        comment: commentRef.current.value,
      },
    });
  };

  return (
    <React.Fragment>
      <section className={classes["comments-page"]}>
        <div className={classes.rant}>
          <RantItem rantData={rant} />
        </div>
        <div className={classes.division}>
          <h2>Comments</h2>
          <div className={classes["division-line"]}></div>
        </div>
        <CommentsList comments={rant ? rant.comments : []} />
      </section>
      <form
        className={classes["write-comment"]}
        onSubmit={commentSubmitHandler}
      >
        <textarea
          placeholder="Write comment..."
          ref={commentRef}
          maxLength="200"
        />
        <button className={classes["send-button"]}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
    </React.Fragment>
  );
};

export default Comments;
