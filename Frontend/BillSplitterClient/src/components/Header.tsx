import { Link } from "react-router-dom";
// Adjust path as per your project

const Header = () => {
  return (
    <header className="header shadow-sm bg-white sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-brand">
            <div className="logo fw-bold fs-4 text-primary">SplitWise Pro</div>
            <div className="tagline text-muted fs-6">Track. Split. Settle. Bill splitting, reimagined.</div>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home me-2"></i>Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <i className="fas fa-info-circle me-2"></i>About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <i className="fas fa-envelope me-2"></i>Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-bill">
                  <i className="fas fa-calculator me-2"></i>Split Bills
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
