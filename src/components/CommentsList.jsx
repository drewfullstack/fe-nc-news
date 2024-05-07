import React, { useEffect, useState } from "react";
import { getComments } from "../../api";
import CommentCard from "./CommentCard";

function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(article_id).then((commentsData) => {
      console.log(commentsData.data.comments);
      setComments(commentsData.data.comments);
    });
  }, [article_id]);

  return (
    <div>
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </div>
  );
}

export default CommentsList;
