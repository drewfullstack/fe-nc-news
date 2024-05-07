import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle, patchArticle } from "../../api";
import "../styles/ArticlePage.css";
import ArticlesList from "./ArticlesList";
import CommentsList from "./CommentsList";

function ArticlePage() {
  const [article, setArticle] = useState(null);
  const { article_id } = useParams();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  useEffect(() => {
    getArticle(article_id).then((articleData) => {
      const dateArray = articleData.data.article.created_at.split("-");
      dateArray.splice(1, 0, " ");
      const formattedDate = dateArray.slice(0, 3);
      articleData.data.article["created_at"] = formattedDate;
      setArticle(articleData.data.article);
    });
  }, [article_id]);

  function handleUpvote() {
    setHasUpvoted(true);
    setHasDownvoted(false);
    const newVoteCount = article.votes + 1;
    setArticle({ ...article, votes: newVoteCount });
    patchArticle(article_id, 1)
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
    setHasDownvoted(true);
    setHasUpvoted(false);
    const newVoteCount = article.votes - 1;
    setArticle({ ...article, votes: newVoteCount });
    patchArticle(article_id, -1)
      .then((articleData) => {
        setArticle(articleData.data.article);
      })
      .catch((error) => {
        console.error("Error updating article vote count:", error);
        setArticle({ ...article, votes: article.votes });
        setHasDownvoted(false);
      });
  }

  return (
    <div className="article-container">
      {article && (
        <>
          <div className="article-content">
            <h1>{article.title}</h1>
            <p>Created On: {article.created_at}</p>
            <p>Author: {article.author}</p>
            <p>Topic: {article.topic}</p>
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
            <CommentsList article_id={article_id} />
          </div>

          <div className="related-stories">
            <h2>Related Stories</h2>
            <ArticlesList topic={article.topic} />
          </div>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
