import { Link } from "react-router-dom";
import { useState } from "react";
import { convertToRelativeTime } from "../../../utils/timeConverter.js";
import { VoteControll } from "./VoteControll.jsx";
import { voteArticle } from "../apis/articles.js";
import UserProfileModal from "../../user/components/UserProfileModal.jsx";
import useUser from "../../user/hooks/useUser.js";

const ArticleCard = (props) => {
  const { article } = props;
  const {
    title,
    author,
    topic,
    article_id,
    comment_count,
    votes,
    created_at,
    article_img_url,
  } = article;
  const [currentVotes, setVotes] = useState(votes);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const { currentUser } = useUser();
  const handleVote = async () => {
    if (currentVotes > votes) {
      try {
        setVotes((vote) => vote - 1);
        const result = await voteArticle(article_id, -1);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
      return;
    }
    try {
      setVotes((vote) => vote + 1);
      const result = await voteArticle(article_id, 1);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <li className="bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl p-5 shadow-[0_12px_32px_rgba(15,35,53,0.12)] animate-rise overflow-hidden space-y-4">
      <Link to={`/articles/${article_id}`} className="block">
        <img
          src={article_img_url}
          alt={`Thumbnail for ${title}`}
          className="w-full aspect-[16/9] rounded-xl object-cover"
          loading="lazy"
        />
      </Link>

      <div className="space-y-2">
        <Link to={`/articles?topic=${topic}`} className="text-[#0a7f78] text-[0.78rem] font-bold uppercase tracking-[0.1em] mb-1 capitalize inline-block hover:underline">
          {topic}
        </Link>
        <Link to={`/articles/${article_id}`}>
          <p className="font-bold text-[#0f3b5f] text-lg leading-snug mb-2 hover:underline">
            {title}
          </p>
        </Link>
        <div className="flex items-center justify-between gap-3 text-[#4d5d69] text-sm">
          <p className="truncate">
            by{" "}
            <button
              onClick={() => setIsAuthorModalOpen(true)}
              className="font-semibold text-[#0f3b5f] bg-[rgba(10,127,120,0.12)] px-3 py-1.5 rounded-lg inline-block hover:bg-[rgba(10,127,120,0.22)] transition-colors duration-150"
            >
              {author}
            </button>
          </p>
          <p className="shrink-0 text-xs">
            {convertToRelativeTime(created_at)}
          </p>
        </div>
        <div className="flex items-center gap-3 pt-3 border-t border-[rgba(17,34,48,0.08)]">
          <VoteControll
            onVote={handleVote}
            className="flex-1"
            currentVote={currentVotes}
            disabled={!currentUser}
          />
          <span className="inline-flex items-center gap-1.5 bg-[rgba(187,122,19,0.1)] text-[#bb7a13] px-3 py-1.5 rounded-lg text-xs font-semibold flex-1 justify-center">
            💬 {comment_count}
          </span>
        </div>
      </div>

      {isAuthorModalOpen && (
        <UserProfileModal
          username={author}
          onClose={() => setIsAuthorModalOpen(false)}
        />
      )}
    </li>
  );
};
export default ArticleCard;
