import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="bg-purple-500">
            <Navbar />
            <Outlet></Outlet>
        </div>
    );
}

export default App;
