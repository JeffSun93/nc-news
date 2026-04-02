export const VoteControl = ({ onVote, className, currentVote, disabled }) => {
  return (
    <button
      onClick={disabled ? undefined : onVote}
      className={`inline-flex items-center gap-1.5 bg-[rgba(10,127,120,0.1)] text-[#0a7f78] px-3 py-1.5 rounded-lg text-xs font-semibold justify-center ${disabled ? "!cursor-default opacity-50" : ""} ${className}`}
    >
      👍 {currentVote}
    </button>
  );
};
