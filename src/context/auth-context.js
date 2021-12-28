import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: null,
  isLogoutClicked: null,
  onLogin: null,
  onLogout: null,
  onLogoutClicked: null,
  onLoginClicked: null,
  angryIcon: null,
  setAngryIcon: null,
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [angryIconURL, setAngryIconURL] = useState("");
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
  };

  const onLoginClicked = () => {
    setIsLogoutClicked(false);
  };

  const onLogoutClicked = () => {
    setIsLogoutClicked(true);
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
        isLogoutClicked: isLogoutClicked,
        onLogin: onLogin,
        onLogout: onLogout,
        onLogoutClicked: onLogoutClicked,
        onLoginClicked: onLoginClicked,
        angryIcon: angryIconURL,
        setAngryIcon: setAngryIcon,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
