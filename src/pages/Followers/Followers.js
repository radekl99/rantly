import { useSelector } from "react-redux";
import { useParams } from "react-router";
import UsersList from "../../components/Users/UsersList";
import classes from "./Followers.module.css";

const Followers = () => {
  const { userId } = useParams();

  const users = useSelector((state) => state.users);

  const user = users.find((user) => user.userId === userId);

  const followers = [];

  if (user && user.followers) {
    user.followers.forEach((follower) => {
      const followerData = users.find((user) => user.userId === follower);
      followers.push(followerData);
    });
  }

  return (
    <section className={classes.followers}>
      <UsersList users={followers} showAbout={false} />
    </section>
  );
};

export default Followers;
