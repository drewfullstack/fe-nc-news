import { Link } from "react-router-dom";
import "../styles/ArticleCard.css";

function ArticleCard({ article }) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div onClick={handleClick}>
      <Link
        to={`/articles/${article.article_id}`}
        key={article.article_id}
        className="link"
      >
        <section className="article-card">
          <img src={article.article_img_url} alt="article" />
          <h3>{article.title}</h3>
          <p>Author: {article.author}</p>
          <p>Topic: {article.topic}</p>
          <p>Votes: {article.votes}</p>
          <p>Created: {article.created_at.split("T")[0]}</p>
        </section>
      </Link>
    </div>
  );
}

export default ArticleCard;
