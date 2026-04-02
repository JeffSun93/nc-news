import { useEffect, useRef, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId, deleteComment, postComment } from "../apis/comments";
import useUser from "../../user/hooks/useUser";

const CommentsView = ({ article_id, onCommentAdded, onCommentDeleted }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useUser();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const comments = await getCommentsByArticleId(article_id);
        setComments(comments);
      } catch {
        setError("Failed to load comments. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [article_id]);

  useEffect(() => {
    if (isAddOpen) {
      textareaRef.current?.focus();
    }
  }, [isAddOpen]);

  const handleDelete = async (comment_id) => {
    let removed;
    setComments((prev) => {
      removed = prev.find((c) => c.comment_id === comment_id);
      return prev.filter((c) => c.comment_id !== comment_id);
    });
    onCommentDeleted?.();
    try {
      await deleteComment(comment_id);
    } catch {
      setComments((prev) => (removed ? [...prev, removed] : prev));
      onCommentAdded?.();
    }
  };

  const handleOpen = () => {
    setIsAddOpen(true);
    setSubmitError(null);
  };

  const handleReset = () => {
    setBody("");
    setIsAddOpen(false);
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const newComment = await postComment(article_id, currentUser.username, body.trim());
      setComments((prev) => [newComment, ...prev]);
      onCommentAdded?.();
      handleReset();
    } catch {
      setSubmitError("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-[1.6rem] font-bold text-[#0f3b5f] mb-4">Comments</h2>
      <div className="max-h-[32rem] overflow-y-auto rounded-2xl bg-[rgba(17,34,48,0.04)] border border-[rgba(17,34,48,0.08)] p-3 flex flex-col gap-2">
        {error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : isLoading ? (
          <>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="bg-white/[0.9] border border-[rgba(17,34,48,0.1)] rounded-xl p-3">
                <div className="h-3.5 w-24 rounded bg-gray-200 animate-pulse mb-2" />
                <div className="space-y-1.5 mb-3">
                  <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-4/5 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-10 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                isOwn={currentUser?.username === comment.author}
                onDelete={() => handleDelete(comment.comment_id)}
              />
            ))}
          </>
        )}
      </div>

      {currentUser && (
        <div className="mt-4">
          {!isAddOpen ? (
            <button
              onClick={handleOpen}
              className="w-full bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl px-4 py-3 text-sm text-[#4d5d69] text-left shadow-[0_12px_32px_rgba(15,35,53,0.08)] hover:bg-white transition-colors duration-150"
            >
              + Add a comment…
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.84] border border-[rgba(17,34,48,0.12)] rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,35,53,0.12)]"
            >
              <textarea
                ref={textareaRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your comment…"
                rows={4}
                className="w-full resize-none rounded-xl border border-[rgba(17,34,48,0.12)] bg-white/60 p-3 text-sm text-[#112230] placeholder-[#9aabb5] focus:outline-none focus:ring-2 focus:ring-[#0a7f78]/40 transition"
              />
              {submitError && (
                <p className="text-red-500 text-xs mt-1">{submitError}</p>
              )}
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-1.5 rounded-lg text-sm text-[#4d5d69] bg-[rgba(17,34,48,0.06)] hover:bg-[rgba(17,34,48,0.12)] transition-colors duration-150"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !body.trim()}
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-[#0a7f78] hover:bg-[#085f5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  {isSubmitting ? "Posting…" : "Post"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
};

export default CommentsView;
