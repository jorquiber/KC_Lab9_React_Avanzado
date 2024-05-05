import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="not-found-link">
        Go back to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
