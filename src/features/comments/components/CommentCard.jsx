import { convertToRelativeTime } from "../../../utils/timeConverter";

const CommentCard = ({ comment }) => {
  const { author, body, created_at, votes } = comment;
  return (
    <li className="bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,35,53,0.12)] animate-rise">
      <h2 className="font-bold text-[#0f3b5f] text-sm mb-1">{author}</h2>
      <p className="text-[#112230] text-sm leading-relaxed mb-2">{body}</p>
      <div className="flex items-center justify-between text-xs text-[#4d5d69]">
        <span>{convertToRelativeTime(created_at)}</span>
        <span>👍 {votes}</span>
      </div>
    </li>
  );
};

export default CommentCard;
