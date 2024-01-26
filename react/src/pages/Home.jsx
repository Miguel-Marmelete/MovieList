// Importação de módulos e componentes
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import urls from "../../urls";
import getMovieByTitle from "../scripts/getMovieByTitle";

// Componente funcional Home
function Home() {
    // Definição dos estados
    const [movies, setMovies] = useState([]); // Estado para armazenar os filmes
    const [change, setChange] = useState(false); // Estado para controle (não está sendo utilizado no código atualmente)
    const location = useLocation(); // Hook para obter a localização (URL)
    const queryString = new URLSearchParams(location.search); // Obter os parâmetros da query na URL
    const movieTitle = queryString.get("movieTitle"); // Obter o parâmetro "movieName" da query

    // Função para obter os filmes top rated a partir de uma URL
    const getAllMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data);
    };

    // Efeito que é executado quando a localização (URL) muda
    useEffect(() => {
        if (movieTitle) {
            // Se houver um nome de filme na URL, busca o filme pelo nome
            async function searchedMovies() {
                const getMovie = await getMovieByTitle(movieTitle);
                setMovies(getMovie);
            }
            searchedMovies();
        } else {
            if (movieTitle) {
            }
            // Se não houver um nome de filme na URL, busca os filmes top rated
            getAllMovies("http://localhost:8000/api/getAllMovies");
        }
    }, [location.search]); // Este efeito será executado quando a URL mudar

    // Mapeia os filmes e renderiza o componente MovieCard
    const movieCards = movies.map((movie) => {
        return (
            <MovieCard
                key={movie.movie_id}
                movie={movie}
                setChange={setChange}
            />
        );
    });
    // Renderização do componente Home
    return (
        <div className="home_page">
            <div className="movies_container">{movieCards}</div>
        </div>
    );
}

// Exportação do componente Home
export default Home;
