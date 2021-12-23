import { getDatabase, ref, set } from "firebase/database";

export const updateUsers = async (users) => {
  const database = getDatabase();

  await set(ref(database, "users"), users);
};
