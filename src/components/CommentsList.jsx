import React, { useEffect, useState } from "react";
import { getComments } from "../../api";
import CommentCard from "./CommentCard";

function CommentsList({ article_id, comments, setComments, user }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id).then((commentsData) => {
      setComments(commentsData.data.comments);
      setIsLoading(false);
    });
  }, [article_id]);

  return (
    <div>
      {isLoading ? (
        <p>Loading, please wait</p>
      ) : comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              comments={comments}
              setComments={setComments}
              user={user}
            />
          );
        })
      ) : (
        <p>No Comments Yet</p>
      )}
    </div>
  );
}

export default CommentsList;
