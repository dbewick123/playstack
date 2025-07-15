import Layout from "./layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./routes/Landing";
import Home from "./routes/Home";
import GamePage from "./routes/GamePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="landing" replace />} />
        <Route path="landing" element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="game/:id" element={<GamePage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
