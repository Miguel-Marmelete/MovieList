import urls from "../../urls";

async function getMovieByTitle(movie_title) {
    return fetch(`http://localhost:8000/api/movie/title/${movie_title}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(async (response) => {
            if (!response.ok) {
                throw await response.json();
            }
            return response.json();
        })
        .then((data) => {
            console.log("Resposta do backend:", data);
            return data;
        })
        .catch((error) => {
            console.error(error.message);
            return [];
        });
}
export default getMovieByTitle;
