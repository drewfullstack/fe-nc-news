import React, { useEffect, useState } from "react";
import { getComments } from "../../api";
import CommentCard from "./CommentCard";

function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id).then((commentsData) => {
      console.log(commentsData.data.comments);
      setComments(commentsData.data.comments);
      setIsLoading(false);
    });
  }, [article_id]);

  return (
    <div>
      {isLoading ? (
        <p>Loading, please wait</p>
      ) : (
        comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })
      )}
      {}
    </div>
  );
}

export default CommentsList;
