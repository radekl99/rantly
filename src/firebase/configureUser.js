import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";

export const configureUsers = async () => {
  const database = getDatabase();
  const auth = getAuth();

  let userDataExists = false;
  let userData;
  let usersExist = false;
  let users;

  const { uid: userId, displayName: username, photoURL } = auth.currentUser;
  const userInitialData = { userId, username, photoURL: photoURL || "" };

  await get(ref(database, "users")).then((snaphot) => {
    if (snaphot.exists()) {
      usersExist = true;
      users = snaphot.val();
      userDataExists = users.some(
        (user) => user.userId === auth.currentUser?.uid
      );
    }
  });
  if (!usersExist) {
    await set(ref(database, "users"), [userInitialData]);
  }
  if (!userDataExists) {
    const newUsersList = users.concat(userInitialData);
    users = newUsersList;
    userDataExists = true;
    await set(ref(database, "users"), newUsersList);
  }
  if (userDataExists) {
    const { follows, followers, about, photoURL } = users.find(
      (user) => user.userId === auth.currentUser.uid
    );
    userData = {
      username,
      userId,
      photoURL: photoURL || "",
      follows: follows || [],
      followers: followers || [],
      about: about || "",
    };
  }

  return Promise.resolve({ users, userData });
};
