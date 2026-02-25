import { useContext, createContext, useState } from "react";

const CurrentUserContext = createContext(null);

const CurrentUserProvider = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

const useUser = () => {
  return useContext(CurrentUserContext);
};

export { CurrentUserContext, CurrentUserProvider, useUser };
