import { createContext, useState } from "react";

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

export { CurrentUserContext, CurrentUserProvider };
