import { useEffect, useRef, useState } from "react";
import { getUsers } from "../apis/users";

const LoginModal = ({ onClose, onLogin }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleLogin = () => {
    if (!selectedUser) return;
    onLogin(selectedUser);
    onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,35,53,0.45)] backdrop-blur-[4px]"
    >
      <div className="w-[min(420px,92vw)] bg-white/[0.96] border border-[rgba(17,34,48,0.12)] rounded-2xl shadow-[0_24px_48px_rgba(15,35,53,0.18)] animate-rise overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[rgba(17,34,48,0.08)]">
          <p className="text-[#0f3b5f] font-bold text-lg">Choose an account</p>
          <button
            onClick={onClose}
            className="text-[#4d5d69] hover:text-[#0f3b5f] transition-colors duration-150 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* User list */}
        <div className="px-4 py-3 max-h-72 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-2 py-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse shrink-0" />
                  <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500 text-sm text-center py-6">{error}</p>
          ) : (
            <ul className="space-y-1 py-1">
              {users.map((user) => {
                const isSelected = selectedUser?.username === user.username;
                return (
                  <li key={user.username}>
                    <button
                      onClick={() => setSelectedUser(user)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 text-left ${
                        isSelected
                          ? "bg-[rgba(10,127,120,0.12)] ring-1 ring-[rgba(10,127,120,0.4)]"
                          : "hover:bg-[rgba(17,34,48,0.05)]"
                      }`}
                    >
                      <img
                        src={user.avatar_url}
                        alt={user.username}
                        className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-100"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <span
                        className="w-9 h-9 rounded-full shrink-0 bg-[rgba(10,127,120,0.15)] text-[#0a7f78] text-sm font-bold items-center justify-center hidden"
                      >
                        {user.username[0].toUpperCase()}
                      </span>
                      <span className="text-[#0f3b5f] font-semibold text-sm capitalize">
                        {user.username}
                      </span>
                      {isSelected && (
                        <span className="ml-auto text-[#0a7f78] text-base">✓</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[rgba(17,34,48,0.08)] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-[#4d5d69] hover:text-[#0f3b5f] transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleLogin}
            disabled={!selectedUser}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-[#0a7f78] text-white hover:bg-[#08706a] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
