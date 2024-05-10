import Dropdown from "react-bootstrap/Dropdown";
import gravatar from "../../assets/images/gravatar.png";

const Header = () => {
  const logout = () => {
    localStorage.removeItem("admin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-nav">
          <Dropdown className="nav-item dropdown nav-profile">
            <Dropdown.Toggle
              variant=""
              className="nav-link dropdown-toggle"
              id="dropdown-basic"
            >
              <img src={gravatar} alt="userr" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/login" onClick={logout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Header;
