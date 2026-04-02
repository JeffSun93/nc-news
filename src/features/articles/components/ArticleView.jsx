import { useEffect, useState } from "react";
import { getArticleById } from "../apis/articles";
import SingleArticleCard from "./SingleArticleCard";
import ArticleViewSkeleton from "./ArticleViewSkeleton";

const ArticleView = ({ article_id, commentDelta }) => {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const article = await getArticleById(article_id);
        setArticle(article);
      } catch (err) {
        setError("Failed to load article. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [article_id]);

  return isLoading ? (
    <ArticleViewSkeleton />
  ) : error ? (
    <p className="mt-6 text-red-500 text-sm">{error}</p>
  ) : (
    <SingleArticleCard article={article} commentDelta={commentDelta} />
  );
};

export default ArticleView;
