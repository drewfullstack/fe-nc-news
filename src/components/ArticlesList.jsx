import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import "../styles/ArticlesList.css";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((articles) => {
      console.log(articles.data.articles);
      setArticles(articles.data.articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>LOADING</p>;
  } else {
    return (
      <div className="articles-list">
        <h2>ALL ARTICLES</h2>
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </div>
    );
  }
}

export default ArticlesList;
