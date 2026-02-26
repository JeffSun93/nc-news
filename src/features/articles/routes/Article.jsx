import { useParams } from "react-router-dom";
import ArticleView from "../components/ArticleView.jsx";

const Article = () => {
  const { article_id } = useParams();
  return <ArticleView article_id={article_id} />;
};

export default Article;
