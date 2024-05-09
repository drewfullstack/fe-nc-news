import "./styles/App.css";
import ArticleList from "./components/ArticlesList";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import ArticlePage from "./components/ArticlePage";
import UsersList from "./components/UsersList";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/articles" element={<ArticleList />}></Route>
        <Route path="/" element={<UsersList setUser={setUser} />}></Route>
        <Route
          path="/articles/:article_id"
          element={<ArticlePage user={user} />}
        ></Route>
        <Route path="/category/:category" element={<ArticleList />}></Route>
      </Routes>
    </>
  );
}

export default App;
