import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MemoriesPage from './pages/MemoriesPage';
import BirthdayPage from './pages/BirthdayPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MemoriesPage />} />
        <Route path="/birthday" element={<BirthdayPage />} />
      </Routes>
    </BrowserRouter>
  );
}
