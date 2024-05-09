import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import "../styles/ArticlesList.css";

function ArticlesList({ topic }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();

  if (category) {
    topic = category;
  }

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles.data.articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>LOADING</p>;
  } else {
    return (
      <div className="articles-list">
        <h2>{topic ? `Articles on ${topic}` : "All Articles"}</h2>
        <ul>
          {topic
            ? articles
                .filter((article) => article.topic === topic)
                .map((filteredArticle) => (
                  <ArticleCard
                    key={filteredArticle.article_id}
                    article={filteredArticle}
                  />
                ))
            : articles.map((article) => (
                <ArticleCard key={article.article_id} article={article} />
              ))}
        </ul>
      </div>
    );
  }
}

export default ArticlesList;
