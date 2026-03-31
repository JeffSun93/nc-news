import { useState } from "react";
import useUser from "../features/user/hooks/useUser";
import LoginModal from "../features/user/components/LoginModal";

const Header = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => setCurrentUser(null);

  return (
    <>
      <header className="pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#0a7f78] tracking-[0.1em] text-[0.78rem] font-bold uppercase mb-1">
              NC News
            </p>
            <p className="text-[#4d5d69] text-sm">
              {currentUser ? `Logged in as ${currentUser}` : "Not logged in"}
            </p>
          </div>
          {currentUser ? (
            <button
              onClick={handleSignOut}
              className="text-sm font-semibold text-[#0a7f78] hover:underline transition-colors duration-200"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-semibold text-[#0a7f78] hover:underline transition-colors duration-200"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {isModalOpen && (
        <LoginModal
          onClose={() => setIsModalOpen(false)}
          onLogin={(username) => setCurrentUser(username)}
        />
      )}
    </>
  );
};

export default Header;
