import classes from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import UsersList from "../../components/Users/UsersList";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

const Search = () => {
  const users = useSelector((state) => state.users);
  const searchInputRef = useRef();
  const [foundUsers, setFoudUsers] = useState([]);
  const [wasSearching, setWasSearching] = useState(false);

  const searchFormSubmitHandler = (e) => {
    e.preventDefault();
    setWasSearching(true);

    const searchedUsers = users.filter((user) =>
      user.username
        .toLowerCase()
        .includes(searchInputRef.current.value.trim().toLowerCase())
    );

    setFoudUsers(searchedUsers);
  };

  return (
    <section className={classes["search-page"]}>
      <form
        className={classes["search-form"]}
        onSubmit={searchFormSubmitHandler}
      >
        <input
          type="text"
          placeholder="Search for a ranters..."
          maxLength="30"
          ref={searchInputRef}
        />
        <button className={classes["send-button"]}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <UsersList users={foundUsers} showAbout={true} />
      {wasSearching && foundUsers.length === 0 && <p className={classes['no-ranters-found']}>No ranters found!</p>}
    </section>
  );
};

export default Search;
