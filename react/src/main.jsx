import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Watchlist from "./pages/Watchlist.jsx";
import MovieInfoPage from "./pages/MovieInfoPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StoreMovie from "./pages/StoreMovie.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import DeleteMovie from "./pages/DeleteMovie.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/movie/:movieId" element={<MovieInfoPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/AdminPanel" element={<AdminPanel />} />
                <Route path="/store" element={<StoreMovie />} />
                <Route path="/delete" element={<DeleteMovie />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
