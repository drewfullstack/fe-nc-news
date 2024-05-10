import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { useParams } from "react-router-dom";

import ArticleCard from "./ArticleCard";
import ArticleFilters from "./ArticleFilters";
import "../styles/ArticlesList.css";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import TopicButtons from "./TopicButtons";

function ArticlesList({ topic }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();
  const [topicFilter, setTopicFilter] = useState("");
  const [sortByFilter, setSortByFilter] = useState("date");
  const [orderFilter, setOrderFilter] = useState("ascending");
  const [searchParams, setSearchParams] = useSearchParams();

  if (category) {
    topic = category;
  }

  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    setIsLoading(true);
    const url = window.location.href;
    let queries = "";

    // logic for pulling queries off topic page
    if (url.includes("category")) {
      const queryString = url.split("/")[url.split("/").length - 1];
      let queriesArray = queryString.split("?");
      queriesArray.shift();
      queries = "?" + queriesArray.join("");
    }

    // logic for pulling queries off article page
    if (url.includes("article")) {
      const urlArray = url.split("articles");
      queries = urlArray[1];
    }

    // logic for setting queries to underfined when none selected
    if (queries?.split("")[0] !== "?") {
      queries = undefined;
    }

    getArticles(queries).then((articles) => {
      setArticles(articles.data.articles);
      setIsLoading(false);
    });
  }, [searchParams]);

  if (isLoading) {
    return <p>LOADING</p>;
  } else {
    return (
      <div className="articles-list">
        <h2>{topic ? `Articles on ${topic}` : "All Articles"}</h2>
        <TopicButtons />
        {currentUrl === "/articles" || currentUrl.includes("category") ? (
          <ArticleFilters
            category={category}
            topicFilter={topicFilter}
            setTopicFilter={setTopicFilter}
            sortByFilter={sortByFilter}
            setSortByFilter={setSortByFilter}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        ) : null}

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
