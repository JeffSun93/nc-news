import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard.jsx";
import ArticleCardSkeleton from "./ArticleCardSkeleton.jsx";
import { getArticles } from "../apis/articles.js";

const SKELETON_COUNT = 6;

const SORT_OPTIONS = [
  { value: "created_at", label: "Date" },
  { value: "comment_count", label: "Comments" },
  { value: "votes", label: "Votes" },
];

const ArticlesView = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC");

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const articles = await getArticles(topic, sortBy, order);
        setArticles(articles);
      } catch {
        setError("Failed to load articles. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [topic, sortBy, order]);

  return (
    <>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-[1.6rem] font-bold text-[#0f3b5f] capitalize">
          {topic ? `${topic} articles` : "All articles"}
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-xl p-1 shadow-[0_4px_12px_rgba(15,35,53,0.07)]">
            {SORT_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSortBy(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                  sortBy === value
                    ? "bg-[#0a7f78] text-white"
                    : "text-[#4d5d69] hover:bg-[rgba(10,127,120,0.08)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOrder((o) => (o === "DESC" ? "ASC" : "DESC"))}
            title={order === "DESC" ? "Descending" : "Ascending"}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/[0.84] border border-[rgba(17,34,48,0.12)] shadow-[0_4px_12px_rgba(15,35,53,0.07)] text-[#4d5d69] hover:text-[#0a7f78] hover:bg-[rgba(10,127,120,0.08)] transition-colors duration-150 text-base"
          >
            {order === "DESC" ? "↓" : "↑"}
          </button>
        </div>
      </div>
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <ArticleCardSkeleton key={i} />
              ))
            : articles.map((article) => (
                <ArticleCard key={article.article_id} article={article} />
              ))}
        </ul>
      )}
    </>
  );
};

export default ArticlesView;
