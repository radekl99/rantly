import classes from "./Main.module.css";
import RantsList from "../../components/Rants/RantsList";
import ToggleRants from "../../components/ToggleRants/ToggleRants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const rantRef = useRef();
  const dispatch = useDispatch();
  const rants = useSelector((state) => state.rants);
  const userData = useSelector((state) => state.userData);
  const [allRantsChecked, setAllRantsChecked] = useState(false);

  const rantSubmitHandler = (e) => {
    e.preventDefault();

    if (rantRef.current.value) {
      dispatch({
        type: "ADD_RANT",
        payload: {
          rant: rantRef.current.value,
        },
      });

      setAllRantsChecked(true);
      rantRef.current.value = "";
    }
  };

  const areAllRantsChecked = (allRantsChecked) => {
    setAllRantsChecked(allRantsChecked);
  };

  let displayedRants;
  if (allRantsChecked) {
    displayedRants = rants;
  } else {
    displayedRants = rants.filter((rant) =>
      userData?.follows?.includes(rant.userId)
    );
  }

  return (
    <section className={classes["main-page"]}>
      <form className={classes["write-rant"]} onSubmit={rantSubmitHandler}>
        <textarea
          placeholder="What made you angry recently?"
          maxLength="250"
          ref={rantRef}
        />
        <button className={classes["send-button"]}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
      <ToggleRants areAllRantsChecked={areAllRantsChecked} />
      <RantsList rants={displayedRants} />
    </section>
  );
};

export default Main;
