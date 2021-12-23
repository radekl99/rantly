import { getAuth, updateProfile } from "firebase/auth";

export const updateUserData = async (newPhotoURL, newUsername, userData) => {
  const auth = getAuth();

  await updateProfile(auth.currentUser, {
    displayName: newUsername || userData.username,
    photoURL: newPhotoURL || userData.photoURL,
  });
};
