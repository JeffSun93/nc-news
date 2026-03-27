import { Link } from "react-router-dom";
import { convertToRelativeTime } from "../utils/timeConverter.js";

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
  return (
    <li className="bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl p-5 shadow-[0_12px_32px_rgba(15,35,53,0.12)] animate-rise overflow-hidden">
      <Link to={`/articles/${article_id}`} className="block space-y-4">
        <img
          src={article_img_url}
          alt={`Thumbnail for ${title}`}
          className="w-full aspect-[16/9] rounded-xl object-cover"
          loading="lazy"
        />

        <div className="space-y-2">
          <p className="text-[#0a7f78] text-[0.78rem] font-bold uppercase tracking-[0.1em] mb-1 capitalize">
            {topic}
          </p>
          <p className="font-bold text-[#0f3b5f] text-lg leading-snug mb-2">
            {title}
          </p>
          <div className="flex items-center justify-between gap-3 text-[#4d5d69] text-sm">
            <p className="truncate">
              by{" "}
              <span className="font-semibold text-[#0f3b5f] bg-[rgba(10,127,120,0.12)] px-3 py-1.5 rounded-lg inline-block">
                {author}
              </span>
            </p>
            <p className="shrink-0 text-xs">
              {convertToRelativeTime(created_at)}
            </p>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-[rgba(17,34,48,0.08)]">
            <span className="inline-flex items-center gap-1.5 bg-[rgba(10,127,120,0.1)] text-[#0a7f78] px-3 py-1.5 rounded-lg text-xs font-semibold flex-1 justify-center">
              👍 {votes}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[rgba(187,122,19,0.1)] text-[#bb7a13] px-3 py-1.5 rounded-lg text-xs font-semibold flex-1 justify-center">
              💬 {comment_count}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default ArticleCard;
