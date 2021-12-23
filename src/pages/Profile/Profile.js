import classes from "./Profile.module.css";
import RantsList from "../../components/Rants/RantsList";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { userId } = useParams();
  const currentUserData = useSelector((state) => state.userData);
  const users = useSelector((state) => state.users);
  const rants = useSelector((state) => state.rants);
  const dispatch = useDispatch();

  const history = useHistory();

  let userData, username, photoURL, about, followers;
  if (users) {
    userData = users.find((user) => user.userId === userId);
  }
  if (userData) {
    username = userData.username;
    photoURL = userData.photoURL;
    about = userData.about;
    followers = userData.followers || [];
  }

  let userRants = [];
  if (rants) {
    userRants = rants.filter((rant) => rant.userId === userId);
  }

  let isUserFollowed = false;
  if (currentUserData.follows) {
    isUserFollowed = currentUserData.follows.includes(userId);
  }

  const followChangeHandler = () => {
    if (isUserFollowed) {
      dispatch({ type: "UNFOLLOW", payload: { userId: userId } });
    }
    if (!isUserFollowed) {
      dispatch({ type: "FOLLOW", payload: { userId: userId } });
    }
  };

  const goToFollowersPageHandler = () => {
    followers.length > 0 && history.push(`/followers/${userId}`);
  };

  const goToEditProfileHandler = () => {
    history.push("/edit");
  };

  return (
    <section className={classes.profile}>
      <section className={classes.info}>
        <div className={classes["user-info"]}>
          <img
            src={
              photoURL ||
              "https://cdn-icons-png.flaticon.com/512/260/260222.png"
            }
            alt={username}
          />
          <h2>{username}</h2>
        </div>
        <div className={classes["user-data"]}>
          <h3>Posts: {userRants.length}</h3>
          <h3
            className={classes["followers-info"]}
            onClick={goToFollowersPageHandler}
          >
            Followers: {followers ? followers.length : "0"}
          </h3>
        </div>
        <p className={classes.about}>{about}</p>
        {currentUserData && currentUserData.userId !== userId && (
          <label className={classes["follow-button"]}>
            <input
              type="checkbox"
              checked={isUserFollowed}
              onChange={followChangeHandler}
            />
            <div className={classes["follow-button-appearance"]}>
              {isUserFollowed ? "Unfollow" : "Follow"}
            </div>
          </label>
        )}
        {currentUserData && currentUserData.userId === userId && (
          <button
            className={classes["edit-button"]}
            onClick={goToEditProfileHandler}
          >
            Edit profile
          </button>
        )}
      </section>
      {userRants.length > 0 && (
        <div>
          <div className={classes.division}>
            <h2>Rants</h2>
            <div className={classes["division-line"]}></div>
          </div>
          <section className={classes.rants}>
            <RantsList rants={userRants} />
          </section>
        </div>
      )}
    </section>
  );
};

export default Profile;
