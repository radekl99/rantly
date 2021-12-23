import UserItem from "./UserItem";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  const users = props.users;

  return (
    <ul className={classes["users-list"]}>
      {users.map((user) => (
        <UserItem key={user.userId} user={user} showAbout={props.showAbout} />
      ))}
    </ul>
  );
};

export default UsersList;
