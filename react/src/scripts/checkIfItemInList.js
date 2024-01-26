import urls from "../../urls";

async function checkIfItemInList(movie_id) {
    const username = sessionStorage.getItem("username");
    return fetch(
        `http://localhost:8000/api/${username}/watchlist/hasitem/${movie_id}`
    )
        .then(async (response) => {
            if (!response.ok) {
                throw await response.json();
            }
            return response.json();
        })
        .then((data) => {
            //console.log("Resposta do backend:", data);
            return data;
        })
        .catch((error) => {
            console.error(error.message);
        });
}

export default checkIfItemInList;
