import urls from "../../urls";

async function isUserAdmin() {
    const username = sessionStorage.getItem("username");
    return fetch(`http://localhost:8000/api/role/${username}`)
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
            console.log(error.message);
        });
}

export default isUserAdmin;
