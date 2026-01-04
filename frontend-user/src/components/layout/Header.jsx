import { Link, useNavigate } from "react-router-dom";
import { getAuth, logout } from "../../utils/auth";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();

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
        <Link to="/" className="brand brand-ivy">
          <span className="brand-mark"></span>
          <span className="brand-word">DubaiEscorts</span>
        </Link>

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
