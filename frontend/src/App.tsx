import Layout from "./layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./routes/Landing";
import Home from "./routes/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="landing" replace />} />
        <Route path="landing" element={<Landing />} />
        <Route path="home" element={<Home />} />
        {/* other routes */}
      </Route>
    </Routes>
  );
}

export default App;
