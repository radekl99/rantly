import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export const signInUser = async (app, email, password) => {
  const auth = getAuth(app);

  const result = { error: null };

  await signInWithEmailAndPassword(auth, email, password).catch((e) => {
    result.error = "You have entered an invalid email or password";
  });

  return Promise.resolve(result);
};
