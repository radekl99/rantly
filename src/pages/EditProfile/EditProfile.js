import classes from "./EditProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadNewProfilePhoto } from "../../firebase/uploadNewProfilePhoto";
import { useHistory } from "react-router-dom";

const EditProfile = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [newProfilePhotoSrc, setNewProfilePhotoSrc] = useState("");
  const imageInputRef = useRef();
  const nameInputRef = useRef();
  const aboutInputRef = useRef();

  const history = useHistory();

  const fileUploadedHandler = (event) => {
    if (event.target.files[0].size > 1024 * 1024 * 2) {
      alert("File is too big!");
      return;
    }
    setNewProfilePhotoSrc(URL.createObjectURL(event.target.files[0]));
  };

  const editProfileHandler = async (e) => {
    e.preventDefault();

    const updatedUserData = { photoURL: "", username: "", about: "" };

    if (imageInputRef.current.files.length > 0) {
      updatedUserData.photoURL = await uploadNewProfilePhoto(
        imageInputRef.current.files[0],
        userData.userId
      );
    }

    if (
      nameInputRef.current.value &&
      nameInputRef.current.value !== userData.username
    ) {
      updatedUserData.username = nameInputRef.current.value;
    }

    if (aboutInputRef.current.value !== userData.about) {
      updatedUserData.about = aboutInputRef.current.value;
    }

    dispatch({ type: "UPDATE_USER_DATA", payload: { ...updatedUserData } });

    history.goBack();
  };

  return (
    <section className={classes["edit-profile"]}>
      <img
        src={
          newProfilePhotoSrc ||
          userData.photoURL ||
          "https://cdn-icons-png.flaticon.com/512/260/260222.png"
        }
        alt="Profile picture"
      />
      <form
        className={classes["edit-profile-form"]}
        onSubmit={editProfileHandler}
      >
        <label className={classes["upload-button"]}>
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={fileUploadedHandler}
            ref={imageInputRef}
          />
          <FontAwesomeIcon icon={faCloudUploadAlt} />
          Upload Image
        </label>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          maxLength="30"
          defaultValue={userData.username}
        />
        <label htmlFor="about">What do you rant about?</label>
        <textarea
          id="about"
          ref={aboutInputRef}
          maxLength="200"
          defaultValue={userData.about}
        />
        <button>Save</button>
      </form>
    </section>
  );
};

export default EditProfile;
