import axios from "axios";

export const getCommentsByArticleId = async (article_id) => {
  const { data } = await axios.get(`/api/articles/${article_id}/comments`);
  return data.comments;
};

export const deleteComment = async (comment_id) => {
  await axios.delete(`/api/comments/${comment_id}`);
};

export const voteComment = async (comment_id, inc_votes) => {
  const { data } = await axios.patch(`/api/comments/${comment_id}`, { inc_votes });
  return data.comment;
};

export const postComment = async (article_id, username, body) => {
  const { data } = await axios.post(`/api/articles/${article_id}/comments`, { username, body });
  return data.comment;
};
