import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, patchArticle } from "../../api";
import "../styles/ArticlePage.css";
import ArticlesList from "./ArticlesList";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

function ArticlePage({ user }) {
  const [article, setArticle] = useState(null);
  const { article_id } = useParams();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isLeavingComment, setIsLeavingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasDownvoted(false);
    setHasUpvoted(false);
    getArticle(article_id).then((articleData) => {
      const dateArray = articleData.data.article.created_at.split("-");
      dateArray.splice(1, 0, " ");
      const formattedDate = dateArray.slice(0, 3);
      articleData.data.article["created_at"] = formattedDate;
      setIsLoading(false);
      setArticle(articleData.data.article);
    });
  }, [article_id]);

  function handleUpvote() {
    let newVoteCount = 0;
    let voteChange = 0;
    if (hasDownvoted) {
      voteChange = 2;
      newVoteCount = article.votes + 2;
    } else {
      voteChange = 1;
      newVoteCount = article.votes + 1;
    }

    setHasUpvoted(true);
    setHasDownvoted(false);
    setArticle({ ...article, votes: newVoteCount });
    patchArticle(article_id, voteChange)
      .then((articleData) => {
        setArticle(articleData.data.article);
      })
      .catch((error) => {
        console.error("Error updating article vote count:", error);
        setArticle({ ...article, votes: article.votes });
        setHasUpvoted(false);
      });
  }
  function handleDownvote() {
    let newVoteCount = 0;
    let voteChange = 0;
    if (hasUpvoted) {
      voteChange = -2;
      newVoteCount = article.votes - 2;
    } else {
      voteChange = -1;
      newVoteCount = article.votes - 1;
    }
    setHasDownvoted(true);
    setHasUpvoted(false);

    setArticle({ ...article, votes: newVoteCount });
    patchArticle(article_id, voteChange)
      .then((articleData) => {
        setArticle(articleData.data.article);
      })
      .catch((error) => {
        console.error("Error updating article vote count:", error);
        setArticle({ ...article, votes: article.votes });
        setHasDownvoted(false);
      });
  }

  function handleAddComment() {
    setIsLeavingComment(true);
  }

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      <div className="article-container">
        {article && (
          <>
            <div className="article-content">
              <h1>{article.title}</h1>
              <p>Created On: {article.created_at}</p>
              <p>Author: {article.author}</p>
              <p>
                Topic:{" "}
                <Link to={`/category/${article.topic}`}>{article.topic} </Link>
              </p>
              <img src={article.article_img_url} alt="" />
              <p>{article.body}</p>

              <div className="vote-buttons">
                <button onClick={handleUpvote} disabled={hasUpvoted}>
                  Upvote
                </button>
                <span>Current Votes: {article.votes}</span>
                <button onClick={handleDownvote} disabled={hasDownvoted}>
                  Downvote
                </button>
              </div>

              <h2>Comments</h2>

              {user ? (
                <>
                  <p>{user.username}</p>{" "}
                  <button onClick={handleAddComment}>Leave a comment</button>
                </>
              ) : (
                <Link to={"/"}>
                  <p>Please login to comment</p>
                </Link>
              )}

              {isLeavingComment ? (
                <CommentForm
                  user={user}
                  article_id={article_id}
                  comments={comments}
                  setComments={setComments}
                />
              ) : null}

              <CommentsList
                article_id={article_id}
                comments={comments}
                setComments={setComments}
                user={user}
              />
            </div>

            <div className="related-stories">
              <h2>Related Stories</h2>
              <ArticlesList topic={article.topic} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ArticlePage;
