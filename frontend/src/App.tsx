import Layout from './layout/Layout';
import Home from './routes/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
