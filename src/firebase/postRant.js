import { getDatabase, ref, set } from "firebase/database";

export const postRants = (rants) => {
  const database = getDatabase();

  set(ref(database, "rants"), rants);
};
