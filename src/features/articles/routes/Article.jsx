import { useParams } from "react-router-dom";
import ArticleView from "../components/ArticleView.jsx";
import CommentsView from "../../comments/components/CommentsView.jsx";
import NewCommentView from "../components/NewCommentView.jsx";

const Article = () => {
  const { article_id } = useParams();
  return (
    <>
      <section>
        <ArticleView article_id={article_id} />
      </section>
      <section>
        <CommentsView article_id={article_id} />
      </section>
      <section>
        <NewCommentView article_id="article_id=" />
      </section>
    </>
  );
};

export default Article;
