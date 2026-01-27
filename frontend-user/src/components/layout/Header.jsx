import { Link, useNavigate } from "react-router-dom";
import { getAuth, logout } from "../../utils/auth";
import { useGetPublicPagesQuery } from "../../redux/api/pagesApi";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const { data } = useGetPublicPagesQuery();
  const pages = data?.pages || [];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="top-bar">
        Check out the new Dubai VIP client experience!
      </div>

      <div className="container header-inner">
        {/* LOGO */}
        <Link to="/" className="brand brand-ivy">
          <span className="brand-mark"></span>
          <span className="brand-word">DubaiEscorts</span>
        </Link>

        {/* STATIC LINKS */}
        <Link to="/pricing" className="brand brand-ivy">
          <span className="brand-word">Pricing</span>
        </Link>

        {/* ✅ CMS PAGES MENU */}
        {pages.map((page) => (
          <Link
            key={page.slug}
            to={`/pages/${page.slug}`}
            className="brand brand-ivy"
          >
            <span className="brand-word">{page.title}</span>
          </Link>
        ))}

        {/* AUTH ACTIONS */}
        <div className="header-actions">
          {!auth ? (
            <>
              <Link to="/login" className="btn btn-outline-dark btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="btn btn-outline-dark btn-sm">
                Profile
              </Link>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
