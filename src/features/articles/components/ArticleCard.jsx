import { useEffect, useState } from "react";

const ArticleCard = (props) => {
  const { article } = props;
  const { title, author, topic } = article;
  return (
    <>
      <li>
        <p>{title}</p>
        <p>{author}</p>
        <p>{topic}</p>
      </li>
    </>
  );
};
export default ArticleCard;
