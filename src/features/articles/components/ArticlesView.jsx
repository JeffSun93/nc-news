import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard.jsx";

const ArticlesView = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  useEffect(() => {
    axios
      .get("/api/articles", {
        params: topic ? { topic } : {},
      })
      .then(({ data }) => {
        return data;
      })
      .then(({ articles }) => {
        setArticles(articles);
      });
  }, [topic]);

  return (
    <>
      <h2 className="text-[1.6rem] font-bold text-[#0f3b5f] mb-6 capitalize">
        {topic ? `${topic} articles` : "All articles"}
      </h2>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {articles &&
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
      </ul>
    </>
  );
};

export default ArticlesView;
