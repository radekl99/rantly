import classes from "./Loading.module.css";
import LoadingSpinner from "./LoadingSpinner";

const Loading = () => {
  return (
    <div className={classes["loading-page"]}>
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
