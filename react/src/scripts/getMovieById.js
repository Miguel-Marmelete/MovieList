import urls from "../../urls";

async function getMovieById(movieId) {
    const response = await fetch(
        `http://localhost:8000/api/movie/id/${movieId}`
    );
    const movieData = await response.json();
    return movieData;
}
export default getMovieById;
