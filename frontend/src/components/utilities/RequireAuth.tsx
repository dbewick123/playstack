import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserLoading } from "../../store/slices/userSlice";

interface RequireAuthProps {
  children: React.ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectUserLoading);

  if (loading) return null;

  if (!isLoggedIn) return <Navigate to="/home" replace />;

  return <>{children}</>;
}

export default RequireAuth;
