import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <p>404 - Page Not Found</p>
      <Link to={`/articles`}>
        <button>All Articles</button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
