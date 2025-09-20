import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/authSlice";

const Header = () => {
   const dispatch = useDispatch();
const { access } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <ul className="nav">
        <div
          style={{
            background: "transparent",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/post/add">Add Post</NavLink>
          </li>
        </div>
        <div
          style={{
            background: "transparent",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {access ? (
            <>
              <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                Log out
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" end>
                  Log in
                </NavLink>
              </li>
              <li>
                <NavLink className="SignUp" to="/SignUp" end>
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Header;
