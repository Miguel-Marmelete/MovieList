import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import isUserAdmin from "../scripts/isUserAdmin";
function Navbar() {
    const queryString = new URLSearchParams(window.location.search);
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    // Verifique se o usuário está logado quando o componente for montado
    useEffect(() => {
        const username = sessionStorage.getItem("username");
        console.log("aqui: " + username);
        if (username != null) {
            setIsLoggedIn(true);

            const checkIfUserIsAdmin = async () => {
                const role = await isUserAdmin();
                setIsAdmin(role);
            };

            checkIfUserIsAdmin();
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, []);

    const handleSearch = () => {
        setSearchParams({ movieTitle: inputValue });
        queryString.set("movieTitle", searchParams);
        setInputValue("");
    };

    const logout = () => {
        sessionStorage.clear();
        window.location.reload();
    };

    return (
        <div className="navbar_container">
            <div className="logo">
                <Link
                    to={`/`}
                    style={{ color: "#000", textDecoration: "none" }}
                >
                    Movie
                    <br />
                    List
                </Link>
            </div>
            {isLoggedIn && <p>{sessionStorage.getItem("username")}</p>}
            {isAdmin && (
                <Link to={`/AdminPanel`}>
                    <button className="navbar_search-button">
                        Admin Panel
                    </button>
                </Link>
            )}

            <div className="navbar_search">
                <input
                    type="text"
                    placeholder="Search Movie"
                    className="navbar_search-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                ></input>
                <button className="navbar_search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div>
                {!isLoggedIn && (
                    <div>
                        <button className="navbar_login_button">
                            <Link
                                to="/login"
                                style={{
                                    color: "#FFF",
                                    textDecoration: "none",
                                }}
                            >
                                Login
                            </Link>
                        </button>
                        <button className="navbar_register_button">
                            <Link
                                to="/register"
                                style={{
                                    color: "#FFF",
                                    textDecoration: "none",
                                }}
                            >
                                Register
                            </Link>
                        </button>
                    </div>
                )}

                {isLoggedIn && (
                    <div>
                        <button className="watchlist_button" onClick={logout}>
                            <Link
                                to="/"
                                style={{
                                    color: "#FFF",
                                    textDecoration: "none",
                                }}
                            >
                                Logout
                            </Link>
                        </button>
                        <button className="watchlist_button">
                            <Link
                                to="/watchlist"
                                style={{
                                    color: "#FFF",
                                    textDecoration: "none",
                                }}
                            >
                                Watchlist
                            </Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
