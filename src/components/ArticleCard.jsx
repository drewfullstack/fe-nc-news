function ArticleCard({ article }) {
  return (
    <section className="article-card">
      <img src={article.article_img_url} alt="article image" />
      <h3>{article.title}</h3>
      <p>Topic: {article.topic}</p>
    </section>
  );
}

export default ArticleCard;
