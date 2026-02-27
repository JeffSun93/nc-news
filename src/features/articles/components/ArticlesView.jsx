import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard.jsx";

const ArticlesView = () => {
  const [articles, setArticles] = useState([
    { title: "abc", author: "aidjfwe", topic: "sd" },
    { title: "bcd", body: "asdfadsf" },
  ]);

  useEffect(() => {
    axios
      .get("/api/articles")
      .then(({ data }) => {
        return data;
      })
      .then(({ articles }) => {
        setArticles(articles);
      });
  }, []);

  return (
    <>
      <ul>
        {articles &&
          articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
      </ul>
    </>
  );
};

export default ArticlesView;
