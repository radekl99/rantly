import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.scaler}>
      <div className={classes["loading-spinner"]}></div>
    </div>
  );
};

export default LoadingSpinner;
