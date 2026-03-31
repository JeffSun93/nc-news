import { useContext } from "react";
import { CurrentUserContext } from "../components/CurrentUser.jsx";

const useUser = () => {
  return useContext(CurrentUserContext);
};

export default useUser;
