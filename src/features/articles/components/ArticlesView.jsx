import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard.jsx";
import ArticleCardSkeleton from "./ArticleCardSkeleton.jsx";

const SKELETON_COUNT = 6;

const ArticlesView = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/articles", {
        params: topic ? { topic } : {},
      })
      .then(({ data }) => {
        return data;
      })
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      });
  }, [topic]);

  return (
    <>
      <h2 className="text-[1.6rem] font-bold text-[#0f3b5f] mb-6 capitalize">
        {topic ? `${topic} articles` : "All articles"}
      </h2>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <ArticleCardSkeleton key={i} />
            ))
          : articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
      </ul>
    </>
  );
};

export default ArticlesView;
