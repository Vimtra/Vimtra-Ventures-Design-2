import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-space-bg" />
      <div className="notfound-stars" />

      <h2 className="notfound-title reveal in">
        We can't find the page that you're looking for :(
      </h2>

      <div className="notfound-stage">
        <div className="notfound-num reveal in">404</div>
        <div className="notfound-planet" />
      </div>

      <div className="notfound-btn-wrap reveal in" style={{ animationDelay: "0.4s" }}>
        <Link className="btn btn-glass btn-lg ae-elastic-hover" to="/">
          <span>BACK TO HOMEPAGE</span>
        </Link>
      </div>
    </div>
  );
}
