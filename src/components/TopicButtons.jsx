import { Link } from "react-router-dom";

function TopicButtons() {
  return (
    <div>
      <span>Search by topic: </span>
      <Link to={`/category/coding`}>
        <button className="topic-btn">Coding</button>
      </Link>
      <Link to={`/category/cooking`}>
        <button className="topic-btn">Cooking</button>
      </Link>
      <Link to={`/category/football`}>
        <button className="topic-btn">Football</button>
      </Link>
    </div>
  );
}

export default TopicButtons;
