import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import addMovie from "../scripts/addMovie";
import checkIfItemInList from "../scripts/checkIfItemInList";
import removeMovie from "../scripts/removeMovie";
import { Link } from "react-router-dom";
import isUserAdmin from "../scripts/isUserAdmin";

function MovieCard({ movie }) {
    //voltar a adicionar o handle addremoveclick -> enviar o id do filme no link e add/remove dependendo se esá ou não
    //na watchlist
    const [isItemInList, setIsItemInList] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const checkItemInList = async () => {
            const itemInList = await checkIfItemInList(movie.movie_id);
            setIsItemInList(itemInList);
        };
        const checkIfUserIsAdmin = async () => {
            const role = await isUserAdmin();
            setIsAdmin(role);
        };
        if (sessionStorage.getItem("username")) {
            checkItemInList();
            checkIfUserIsAdmin();
        }
    }, [isItemInList]);

    const handleAddRemoveClick = async () => {
        if (isItemInList) {
            const confirmed = window.confirm(
                "Are you sure you want to remove this movie?"
            );
            if (confirmed) {
                await removeMovie(movie.movie_id);
                setIsItemInList(false);
            }
        } else {
            await addMovie(movie.movie_id);
            setIsItemInList(true);
        }
    };

    return (
        <div className="movie_card">
            <Link to={`/movie/${movie.movie_id}`}>
                <img
                    className="movie_card_image"
                    src={movie.poster_path}
                    alt={movie.title}
                />
            </Link>

            <div className="movie_card_info">
                <h2 className="movie_title">
                    {movie.title}
                    {isAdmin && ` (${movie.movie_id})`}
                </h2>
                <p className="rating">
                    <FaStar /> {movie.rating}
                </p>
                <div>
                    {sessionStorage.getItem("username") && (
                        <button
                            className="add_remove_button"
                            onClick={handleAddRemoveClick}
                        >
                            {isItemInList ? "Remove" : "Add"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieCard;

//{isItemInList ? "Remove" : "Add"}
//com o id ir buscar o filme e mostrar os dados
// Obter o ID da lista do armazenamento local
//const listId = localStorage.getItem("list_id");

// Estados para armazenar informações sobre o filme e se ele está na lista
//const [movie, setMovie] = useState({});
//

// Efeito para obter informações do filme quando o componente é montado
/*
    useEffect(() => {
        async function handleMovie() {
            const getMovie = await getMovieById(movieId);
            console.log(movieId);
            setMovie(getMovie);
        }
        handleMovie();
    }, [movieId]);*/ // Executa sempre que movieId muda
// Efeito para verificar se o item está na lista quando o componente é montado ou quando isItemInList muda
/*useEffect(() => {
        const checkItemInList = async () => {
            const itemInList = await checkIfItemInList(movieId, listId);
            setIsItemInList(itemInList);
        };
        checkItemInList();
    }, [isItemInList, listId]); // Executa sempre que isItemInList ou listId mudam*/

// Função para lidar com a adição/remoção do filme da lista
/*
    const handleAddRemoveClick = async () => {
        if (isItemInList) {
            const confirmed = window.confirm(
                "Are you sure you want to remove this movie?"
            );
            if (confirmed) {
                await removeItem({ movieId });
                setChange(true);
                setIsItemInList(false);
            }
        } else {
            await addMovie({ movieId });
            setIsItemInList(true);
        }
    };
*/
