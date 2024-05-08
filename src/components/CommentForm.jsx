import { useState } from "react";
import { postComment } from "../../api";

function CommentForm({ article_id, user, comments, setComments, getComments }) {
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [errorSubmittingComment, setErrorSubmittingComment] = useState(false);

  function handleSubmitComment(e) {
    e.preventDefault();
    setIsCommenting(true);
    const prevComments = comments;

    postComment(article_id, user.username, comment)
      .then((commentData) => {
        setComments([commentData.data.comment, ...comments]);
        setIsCommenting(false);
        setComment("");
      })
      .catch((err) => {
        setIsCommenting(false);
        setComment("");
        setErrorSubmittingComment(true);
        setComments(prevComments);
      });
  }

  return (
    <section className="comment-form">
      {errorSubmittingComment ? (
        <p>Error submitting comment, please try again</p>
      ) : null}
      <form onSubmit={handleSubmitComment} disabled={isCommenting}>
        <div>User: {user.username} </div>
        <label htmlFor="comment">
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isCommenting}
          />
        </label>
        <button type="submit" disabled={isCommenting}>
          Submit Comment
        </button>
      </form>
    </section>
  );
}

export default CommentForm;
