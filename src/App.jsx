import "./styles/App.css";
import ArticleList from "./components/ArticlesList";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticleList />}></Route>
        <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
