import { useState } from "react";
import { convertToRelativeTime } from "../../../utils/timeConverter";
import { voteComment } from "../apis/comments";
import useUser from "../../user/hooks/useUser";

const CommentCard = ({ comment, isOwn, onDelete }) => {
  const { comment_id, author, body, created_at, votes } = comment;
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);
  const { currentUser } = useUser();

  const handleVote = async () => {
    if (hasVoted) {
      try {
        setCurrentVotes((v) => v - 1);
        setHasVoted(false);
        await voteComment(comment_id, -1);
      } catch {
        setCurrentVotes((v) => v + 1);
        setHasVoted(true);
      }
      return;
    }
    try {
      setCurrentVotes((v) => v + 1);
      setHasVoted(true);
      await voteComment(comment_id, 1);
    } catch {
      setCurrentVotes((v) => v - 1);
      setHasVoted(false);
    }
  };

  return (
    <li className="bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,35,53,0.12)] animate-rise">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-bold text-[#0f3b5f] text-sm">
          {isOwn ? "Me" : author}
        </h2>
        {isOwn && (
          <button
            onClick={onDelete}
            className="text-xs text-[#a23357] hover:underline transition-colors duration-150"
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-[#112230] text-sm leading-relaxed mb-2">{body}</p>
      <div className="flex items-center justify-between text-xs text-[#4d5d69]">
        <span>{convertToRelativeTime(created_at)}</span>
        <button
          onClick={currentUser ? handleVote : undefined}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg transition-colors duration-150 font-semibold ${
            !currentUser
              ? "!cursor-default bg-[rgba(10,127,120,0.08)] text-[#4d5d69]"
              : hasVoted
              ? "bg-[rgba(10,127,120,0.2)] text-[#0a7f78]"
              : "bg-[rgba(10,127,120,0.08)] text-[#4d5d69] hover:bg-[rgba(10,127,120,0.15)]"
          }`}
        >
          👍 {currentVotes}
        </button>
      </div>
    </li>
  );
};

export default CommentCard;
