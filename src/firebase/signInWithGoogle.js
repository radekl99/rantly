import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

export const signInWithGoogle = (app) => {
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();

  signInWithRedirect(auth, googleProvider);
};
