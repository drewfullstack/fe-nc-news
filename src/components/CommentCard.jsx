import "../styles/CommentCard.css";
import { deleteComment } from "../../api";
import { useState } from "react";

function CommentCard({ comment, comments, setComments, user }) {
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  function handleDeleteComment(comment_id) {
    setIsDeletingComment(true);

    deleteComment(comment_id)
      .then(() => {
        setIsDeletingComment(false);

        const filteredComments = comments.filter((comment) => {
          return comment.comment_id !== comment_id;
        });

        setComments(filteredComments);
      })
      .catch((err) => {});
  }
  return (
    <div
      className={
        isDeletingComment ? "comment-card delete-in-progress" : "comment-card"
      }
    >
      <h3>{comment.author}</h3>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>

      {comment.author === user?.username ? (
        <button
          onClick={() => handleDeleteComment(comment.comment_id)}
          disabled={isDeletingComment}
        >
          Delete Comment
        </button>
      ) : null}
    </div>
  );
}

export default CommentCard;
