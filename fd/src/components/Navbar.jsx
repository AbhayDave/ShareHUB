import ThemeDropdown from "./ThemeDropdown";
import {Link} from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authService";
import { logout } from "../app/auth/authSlice";


function Navbar() {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await logoutUser();
    if (response) {dispatch(logout());
      navigate("/")
    }
  };

  return (
    // <div className="navbar bg-base-100 fixed z-10">
    <div className="navbar bg-base-100 z-50 transition-all duration-300 space-x-5 ease-in-out">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          ShareHUB
        </Link>
      </div>

      {authStatus && (
        <div>
          <button onClick={logoutHandler} className="btn btn-primary">Logout</button>
        </div>
      )}

      <div className="flex-none gap-2">
        <div>
          <ThemeDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
