import { useUser } from "../contexts/CurrentUser.jsx";
const Header = () => {
  console.log(useUser());
  const { currentUser, setCurrentUser } = useUser();
  const logUser = (currentUser) => {
    if (currentUser) {
      setCurrentUser(null);
    } else {
      setCurrentUser("jeff");
    }
  };

  return (
    <header>
      <p>{currentUser}</p>
      <button
        onClick={() => {
          logUser(currentUser);
        }}
      >
        {currentUser ? "signout" : "login"}
      </button>
    </header>
  );
};

export default Header;
