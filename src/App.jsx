import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";

import DashboardHome from "./pages/dashboard/DashboardHome";
import Movies from "./pages/dashboard/Movies";
import WebSeries from "./pages/dashboard/WebSeries";
import Activity from "./pages/dashboard/Activity";
import Settings from "./pages/dashboard/Settings";
import Register from "./pages/registration/Register";
import Subscription from "./components/subscription/subscription";
import Profile from "./pages/profile/Profile";
import { Movie } from "./pages/dashboard/Movie";
import SeasonPage from "./pages/dashboard/SeasonPage";
import WebSeriesDetails from "./pages/dashboard/WebSeriesDetails";
import EpisodePage from "./pages/dashboard/EpisodePage";
import Favorites from "./pages/dashboard/Favorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardHome />}>
        {/* Default route inside dashboard */}
        <Route index element={<Dashboard />} />
        {/* Nested dashboard routes */}
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<Movie />} />
        <Route path="web-series" element={<WebSeries />} />
        <Route path="web-series/:id" element={<WebSeriesDetails />} />
        <Route path="/dashboard/web-series/:id/season/:seasonNumber"element={<SeasonPage />} />
        <Route path="/dashboard/web-series/:id/season/:seasonNumber/episode/:episodeNumber" element={<EpisodePage />}
          />
        <Route path="activity" element={<Activity />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="/dashboard/subscription" element={<Subscription />} />
      </Route>
    </Routes>
  );
}

export default App;
