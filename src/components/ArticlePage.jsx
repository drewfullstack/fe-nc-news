import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../../api";
import "../styles/ArticlePage.css";
import ArticlesList from "./ArticlesList";

function ArticlePage() {
  const [article, setArticle] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id).then((articleData) => {
      const dateArray = articleData.data.article.created_at.split("-");
      dateArray.splice(1, 0, " ");
      const formattedDate = dateArray.slice(0, 3);
      console.log(articleData.data.article);
      articleData.data.article["created_at"] = formattedDate;
      setArticle(articleData.data.article);
    });
  }, [article_id]);

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
          </div>
          <div className="related-stories">
            <h3>Related Stories</h3>

            <ArticlesList topic={article.topic} />
          </div>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
