import { Link } from "react-router-dom";
import "../styles/ArticleCard.css";

function ArticleCard({ article }) {
  return (
    <Link
      to={`/articles/${article.article_id}`}
      key={article.article_id}
      className="link"
    >
      <section className="article-card">
        <img src={article.article_img_url} alt="article" />
        <h3>{article.title}</h3>
        <p>Topic: {article.topic}</p>
      </section>
    </Link>
  );
}

export default ArticleCard;
