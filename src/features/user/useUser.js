import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUser.jsx";

const useUser = () => {
  return useContext(CurrentUserContext);
};

export default useUser;
