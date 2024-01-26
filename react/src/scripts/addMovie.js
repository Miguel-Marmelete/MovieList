async function addMovie(movieId) {
    const username = sessionStorage.getItem("username");
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            movie_id: movieId,
            username: username,
        }),
    };

    const response = await fetch(
        `http://localhost:8000/api/movie/add`,
        options
    );
    const movieData = await response.json();
    return movieData;
}
export default addMovie;
