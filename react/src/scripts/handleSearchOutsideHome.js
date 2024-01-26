import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function handleSearchOutsideHome() {
    const location = useLocation();
    const queryString = new URLSearchParams(location.search);
    const movieTitle = queryString.get("movieTitle");

    useEffect(() => {
        if (movieTitle) {
            window.location = `/?movieTitle=${movieTitle}`;
        }
    }, [location.search]);
}
