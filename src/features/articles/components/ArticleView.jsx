import axios from "axios";
import { useEffect, useState } from "react";
import VoteControll from "./VoteControll";

const ArticleView = ({ article_id }) => {
  const [article, setArticle] = useState("null");
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    axios.get(`/api/articles/${article_id}`).then(({ data }) => {
      setArticle(data.article);
    });
  }, [article_id]);
  useEffect(() => {
    if (article) {
      setVotes(article.votes);
    }
  }, [article]);
  const {
    title,
    author,
    topic,
    created_at,
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
      <VoteControll votes={votes} setVotes={setVotes} voted_id={article_id} />
      <h3>{comment_count}</h3>
      <img src={article_img_url} alt={`img for article ${article_id}`} />
      <p>{body}</p>
    </div>
  );
};
export default ArticleView;
