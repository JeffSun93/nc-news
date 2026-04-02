import { useState } from "react";
import { Link } from "react-router-dom";
import { VoteControll } from "./VoteControll";
import { voteArticle } from "../apis/articles";
import { convertToRelativeTime } from "../../../utils/timeConverter";
import UserProfileModal from "../../user/components/UserProfileModal";
import useUser from "../../user/hooks/useUser";

const SingleArticleCard = ({ article }) => {
  const {
    article_id,
    title,
    author,
    topic,
    created_at,
    votes,
    comment_count,
    article_img_url,
    body,
  } = article;

  const [currentVotes, setVotes] = useState(votes);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const { currentUser } = useUser();

  const handleVote = async () => {
    if (currentVotes > votes) {
      try {
        setVotes((v) => v - 1);
        await voteArticle(article_id, -1);
      } catch (error) {
        setVotes((v) => v + 1);
      }
      return;
    }
    try {
      setVotes((v) => v + 1);
      await voteArticle(article_id, 1);
    } catch (error) {
      setVotes((v) => v - 1);
    }
  };

  return (
    <div className="mt-6 animate-rise bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl p-6 shadow-[0_12px_32px_rgba(15,35,53,0.12)]">
      <Link to={`/articles?topic=${topic}`} className="text-[#0a7f78] text-[0.78rem] font-bold uppercase tracking-[0.1em] mb-2 capitalize inline-block hover:underline">
        {topic}
      </Link>
      <h1 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-snug text-[#0f3b5f] mb-3">
        {title}
      </h1>
      <div className="flex items-center gap-3 mb-4 text-sm text-[#4d5d69]">
        <button
          onClick={() => setIsAuthorModalOpen(true)}
          className="font-semibold text-[#0f3b5f] bg-[rgba(10,127,120,0.12)] px-3 py-1.5 rounded-lg hover:bg-[rgba(10,127,120,0.22)] transition-colors duration-150"
        >
          {author}
        </button>
        <span>{convertToRelativeTime(created_at)}</span>
      </div>
      <img
        src={article_img_url}
        alt={`img for article ${article_id}`}
        className="w-full rounded-xl my-5 object-cover max-h-96"
      />
      <p className="text-[#112230] leading-relaxed mb-5">{body}</p>
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(17,34,48,0.08)]">
        <VoteControll onVote={handleVote} currentVote={currentVotes} className="w-fit" disabled={!currentUser} />
        <span className="inline-flex items-center gap-1.5 bg-[rgba(187,122,19,0.1)] text-[#bb7a13] px-3 py-1.5 rounded-lg text-xs font-semibold">
          💬 {comment_count}
        </span>
      </div>
      {isAuthorModalOpen && (
        <UserProfileModal
          username={author}
          onClose={() => setIsAuthorModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SingleArticleCard;
