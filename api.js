import axios from "axios";

function getArticles() {
  return axios.get("https://nc-news-api-ybcs.onrender.com/api/articles");
}

export { getArticles };
