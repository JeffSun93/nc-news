import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId, deleteComment } from "../apis/comments";
import useUser from "../../user/hooks/useUser";

const CommentsView = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const comments = await getCommentsByArticleId(article_id);
        setComments(comments);
      } catch (err) {
        setError("Failed to load comments. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [article_id]);

  const handleDelete = async (comment_id) => {
    setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
    try {
      await deleteComment(comment_id);
    } catch (err) {
      setComments((prev) => {
        const restored = comments.find((c) => c.comment_id === comment_id);
        return restored ? [...prev, restored] : prev;
      });
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-[1.6rem] font-bold text-[#0f3b5f] mb-4">Comments</h2>
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : isLoading ? (
        <ul className="flex flex-col gap-3">
          {Array.from({ length: 3 }, (_, i) => (
            <li key={i} className="bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,35,53,0.12)]">
              <div className="h-3.5 w-24 rounded bg-gray-200 animate-pulse mb-2" />
              <div className="space-y-1.5 mb-3">
                <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-4/5 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-10 rounded bg-gray-200 animate-pulse" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              isOwn={currentUser?.username === comment.author}
              onDelete={() => handleDelete(comment.comment_id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default CommentsView;
