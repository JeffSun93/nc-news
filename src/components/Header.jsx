import useUser from "../features/user/useUser";
const Header = () => {
  const { currentUser, setCurrentUser } = useUser();
  const logUser = (user) => {
    if (user) {
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
