import { useEffect, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard.jsx";

const CommentsView = ({ article_id }) => {
  const [comments, setComments] = useState([
    { comment_id: 1 },
    { comment_id: 2 },
  ]);
  useEffect(() => {
    axios
      .get(`/api/articles/12/comments`)
      .then(({ data }) => {
        return data;
      })
      .then(({ comments }) => {
        setComments(comments);
      });
  }, []);
  return (
    <ul>
      {comments &&
        comments.map((comment, index) => {
          return <CommentCard key={index} comment={comment} />;
        })}
    </ul>
  );
};
export default CommentsView;
