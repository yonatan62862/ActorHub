import { Routes, Route, Navigate } from "react-router-dom";
import { useCastList } from "./hooks/useCast";
import { useTheme } from "./hooks/useTheme"; 
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  const { data: castList } = useCastList();
  const { toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <Header source={castList?.source} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actor/:id" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
