import { useHistory } from "react-router";
import RantItem from "./RantItem";
import classes from "./RantsList.module.css";

const RantsList = (props) => {
  const rants = props.rants;

  const history = useHistory();

  const goToSearch = () => {
    history.push("/search");
  };

  return (
    <ul className={classes["rants-list"]}>
      {rants &&
        rants.map((rant) => <RantItem key={rant.rantId} rantData={rant} />)}
      {rants.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No rants found :( Find more ranters{" "}
          <span className={classes.link} onClick={goToSearch}>
            Here!
          </span>
        </p>
      )}
    </ul>
  );
};

export default RantsList;
