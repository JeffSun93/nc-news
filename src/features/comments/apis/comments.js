import axios from "axios";

export const getCommentsByArticleId = async (article_id) => {
  const { data } = await axios.get(`/api/articles/${article_id}/comments`);
  return data.comments;
};
