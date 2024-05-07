import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../../api";
import "../styles/ArticlePage.css";
import ArticlesList from "./ArticlesList";
import CommentsList from "./CommentsList";

function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id).then((articleData) => {
      setIsLoading(false);
      const dateArray = articleData.data.article.created_at.split("-");
      dateArray.splice(1, 0, " ");
      const formattedDate = dateArray.slice(0, 3);
      articleData.data.article["created_at"] = formattedDate;
      setArticle(articleData.data.article);
    });
  }, [article_id]);

  return (
    <div className="article-container">
      {isLoading && <p>Loading, please wait...</p>}
      {article && (
        <>
          <div className="article-content">
            <h1>{article.title}</h1>
            <p>Created On: {article.created_at}</p>
            <p>Author: {article.author}</p>
            <p>Topic: {article.topic}</p>
            <img src={article.article_img_url} alt="" />
            <p>{article.body}</p>
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
