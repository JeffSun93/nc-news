import { useState } from "react";
import useUser from "../features/user/hooks/useUser";
import LoginModal from "../features/user/components/LoginModal";
import UserProfileModal from "../features/user/components/UserProfileModal";

const Header = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  const handleSignOut = () => setCurrentUser(null);

  return (
    <>
      <header className="pt-10 pb-6">
        <div className="flex items-center justify-between">
          <p className="text-[#0a7f78] tracking-[0.1em] text-[0.78rem] font-bold uppercase">
            NC News
          </p>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAuthorModalOpen(true)}
                className="flex items-center gap-2"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.username}
                  className="w-8 h-8 rounded-full object-cover bg-gray-100"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <span className="w-8 h-8 rounded-full bg-[rgba(10,127,120,0.15)] text-[#0a7f78] text-sm font-bold items-center justify-center hidden">
                  {currentUser.username[0].toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-[#0f3b5f] hover:underline transition-colors duration-200">
                  {currentUser.name}
                </span>
              </button>
              <button
                onClick={handleSignOut}
                className="text-sm font-semibold text-[#0a7f78] hover:underline transition-colors duration-200"
              >
                Sign out
              </button>
            </div>
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
          onLogin={(user) => setCurrentUser(user)}
        />
      )}
      {isAuthorModalOpen && (
        <UserProfileModal
          username={currentUser.username}
          onClose={() => setIsAuthorModalOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
