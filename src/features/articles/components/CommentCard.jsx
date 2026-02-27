import { Link } from "react-router-dom";
const CommentCard = (props) => {
  const { comment } = props;
  const { author, body, created_at, votes } = comment;
  return (
    <li>
      <h2>{author}</h2>
      <p>{body}</p>
      <p>{created_at}</p>
      <p>{votes}</p>
    </li>
  );
};

export default CommentCard;
