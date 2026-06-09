import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { logoutUser, selectUser } from "../store/slices/userSlice";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleSignOut = async () => {
    await dispatch(logoutUser());
    navigate("/home");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-heading">
        <h1>Welcome, <span className="text-highemp-h-span">{user?.username}</span></h1>
        <button className="dashboard-signout-btn" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
      <div className="dashboard-collections">
        <div className="dashboard-wishlist">
          <h2>Wishlist</h2>
          <p>Games you want to play will appear here.</p>
        </div>
        <div className="dashboard-library">
          <h2>Library</h2>
          <p>Games you own or have played will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
