import { useEffect, useRef, useState } from "react";
import { getUserByUsername } from "../apis/users";

const UserProfileModal = ({ username, onClose }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByUsername(username);
        setUser(user);
      } catch (err) {
        setError("Failed to load user.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,35,53,0.45)] backdrop-blur-[4px]"
    >
      <div className="w-[min(360px,92vw)] bg-white/[0.96] border border-[rgba(17,34,48,0.12)] rounded-2xl shadow-[0_24px_48px_rgba(15,35,53,0.18)] animate-rise overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[rgba(17,34,48,0.08)]">
          <p className="text-[#0f3b5f] font-bold text-lg">Author</p>
          <button
            onClick={onClose}
            className="text-[#4d5d69] hover:text-[#0f3b5f] transition-colors duration-150 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-5 w-32 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-sm text-center">{error}</p>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="w-20 h-20 rounded-full object-cover bg-gray-100"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="w-20 h-20 rounded-full bg-[rgba(10,127,120,0.15)] text-[#0a7f78] text-2xl font-bold items-center justify-center hidden">
                {user.username[0].toUpperCase()}
              </span>
              <div>
                <p className="text-[#0f3b5f] font-bold text-lg">{user.name}</p>
                <p className="text-[#4d5d69] text-sm mt-0.5">@{user.username}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold rounded-lg bg-[#0a7f78] text-white hover:bg-[#08706a] transition-colors duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
