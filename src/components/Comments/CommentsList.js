import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  const comments = props.comments;
  return (
    <ul className={classes["comments-list"]}>
      {comments.map((comment) => (
        <CommentItem key={comment.commentId} commentData={comment} />
      ))}
      {comments.length === 0 && <h6>No comments there yet!</h6>}
    </ul>
  );
};

export default CommentsList;
