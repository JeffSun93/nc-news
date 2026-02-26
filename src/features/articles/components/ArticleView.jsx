import axios from "axios";
import { useEffect, useState } from "react";

const ArticleView = ({ article_id }) => {
  const [article, setArticle] = useState("null");
  useEffect(() => {
    axios.get(`/api/articles/${article_id}`).then(({ data }) => {
      setArticle(data.article);
    });
  }, [article_id]);
  const {
    title,
    author,
    topic,
    created_at,
    votes,
    comment_count,
    article_img_url,
    body,
  } = article;

  return (
    <div>
      <h1>{title}</h1>
      <h2>{author}</h2>
      <h3>{topic}</h3>
      <h3>{created_at}</h3>
      <h3>{votes}</h3>
      <h3>{comment_count}</h3>
      <img src={article_img_url} alt={`img for article ${article_id}`} />
      <p>{body}</p>
    </div>
  );
};
export default ArticleView;
