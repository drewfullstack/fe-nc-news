import "../styles/CommentCard.css";

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <h3>{comment.author}</h3>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
}

export default CommentCard;
