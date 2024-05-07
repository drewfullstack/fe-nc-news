import axios from "axios";

function getArticles() {
  return axios.get("https://nc-news-api-ybcs.onrender.com/api/articles");
}

function getArticle(article_id) {
  return axios.get(
    `https://nc-news-api-ybcs.onrender.com/api/articles/${article_id}`
  );
}

function getComments(article_id) {
  return axios.get(
    `https://nc-news-api-ybcs.onrender.com/api/articles/${article_id}/comments`
  );
}

export { getArticles, getArticle, getComments };
