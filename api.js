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

function patchArticle(article_id, vote) {
  return axios.patch(
    `https://nc-news-api-ybcs.onrender.com/api/articles/${article_id}`,
    { inc_votes: vote }
  );
}

function getUsers() {
  return axios.get(`https://nc-news-api-ybcs.onrender.com/api/users`);
}

function postComment(article_id, username, body) {
  return axios.post(
    `https://nc-news-api-ybcs.onrender.com/api/articles/${article_id}/comments`,
    { username, body }
  );
}

export {
  getArticles,
  getArticle,
  getComments,
  patchArticle,
  getUsers,
  postComment,
};
