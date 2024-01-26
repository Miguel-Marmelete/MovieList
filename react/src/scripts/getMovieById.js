import urls from "../../urls";

async function getMovieById(movieId) {
    const response = await fetch(
        `http://localhost:8000/api/movie/id/${movieId}`
    );
    const movieData = await response.json();
    return movieData;

    /*
    fetch(`http://localhost:8000/api/movie/${movieId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro na solicitação.");
            }
            return response.json();
        })
        .then((movie) => {
            // Lidar com os dados retornados pelo backend
            console.log("Lista de filmes da watchlist:", movie);
            return movie;
        })
        .catch((error) => {
            console.error("Erro:", error);
        });*/

    /* const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmZhZjAxZDhlNDNkMDFlMmJhY2QxNjdjYmJlNTVjYyIsInN1YiI6IjY0MDYxYTczMzgzZGYyMDBhOTU1ZTZhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.go6AtD8ijivF0367MCqzWRUeIp4nnPeJJVKKg8qJY4s",
        },
    };

    const response = await fetch(
        `http://localhost:8000/api/movie/${movieId}`,
        options
    );
    const movieData = await response.json();
    return movieData;*/
}
export default getMovieById;
