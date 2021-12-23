import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadNewProfilePhoto = async (photo, userId) => {
  const storage = getStorage();
  const storageRef = ref(storage, `users/${userId}`);

  await uploadBytes(storageRef, photo);

  const newProfilePhotoURL = await getDownloadURL(storageRef);

  return Promise.resolve(newProfilePhotoURL);
};
