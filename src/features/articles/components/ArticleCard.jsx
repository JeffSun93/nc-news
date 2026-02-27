import { Link } from "react-router-dom";

const ArticleCard = (props) => {
  const { article } = props;
  const { title, author, topic, article_id } = article;
  return (
    <>
      <li>
        <Link to={`/articles/${article_id}`}>
          <p>{title}</p>
          <p>{author}</p>
          <p>{topic}</p>
        </Link>
      </li>
    </>
  );
};
export default ArticleCard;
