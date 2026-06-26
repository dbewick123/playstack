import { useEffect } from "react";
import Layout from "./layout/Layout";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchCurrentUser } from "./store/slices/userSlice";
import Landing from "./routes/Landing";
import Home from "./routes/Home";
import GamePage from "./routes/GamePage";
import Dashboard from "./routes/Dashboard";
import RequireAuth from "./components/utilities/RequireAuth";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
