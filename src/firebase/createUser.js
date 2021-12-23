import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";

export const createUser = async (app, name, email, password) => {
  const auth = getAuth(app);

  const result = { error: null };
  let registerSuccess;

  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      registerSuccess = true;
    })
    .catch((e) => {
      switch (e.code) {
        case "auth/email-already-in-use":
          result.error = "That email address is already in use";
          break;
        case "auth/invalid-email":
          result.error = "Please enter a valid email address";
          break;
        default:
          result.error = "Something went wrong";
          break;
      }
    });
  if (registerSuccess)
    await updateProfile(auth.currentUser, { displayName: name });

  return Promise.resolve(result);
};
