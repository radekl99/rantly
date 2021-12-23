import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: null,
  onLogin: null,
  onLogout: null,
  angryIcon: null,
  setAngryIcon: null,
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [angryIconURL, setAngryIconURL] = useState("");

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
  };

  const setAngryIcon = async () => {
    const storage = getStorage();
    const angryIconRef = ref(storage, "/deafult-profile-image/angry.png");
    const angryIcon = await getDownloadURL(angryIconRef);

    setAngryIconURL(angryIcon);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: onLogin,
        onLogout: onLogout,
        angryIcon: angryIconURL,
        setAngryIcon: setAngryIcon,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
