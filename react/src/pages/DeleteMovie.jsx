import React from "react";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
function DeleteMovie() {
    //const navigate = useNavigate();
    const [formData, setFormData] = useState({
        movie_id: "",
    });

    const handleChange = (e) => {
        setFormData({
            [e.target.name]: e.target.value,
        });
        console.log("data:", formData);
    };

    const clearForm = () => {
        setFormData({
            movie_id: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8000/api/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw await response.json();
                }
                return response.json();
            })
            .then((data) => {
                console.log("Resposta do backend:", data);
                alert("Filme removido com sucesso");
                //navigate("/");
                //window.location.reload();
            })
            .catch((error) => {
                console.error(error.message);
                //alert(error.message);
            });

        clearForm();
    };
    return (
        <div className="store_container">
            <form className="store_form" onSubmit={handleSubmit}>
                <h1 className="store_header">Delete Movie</h1>
                <br></br>
                <div className="movie_id_container">
                    <label htmlFor="movie_id" className="movie_id_label">
                        Movie ID
                    </label>
                    <br></br>
                    <input
                        type="number"
                        className="movie_id_input"
                        id="movie_id"
                        name="movie_id"
                        value={formData.movie_id}
                        onChange={handleChange}
                    />
                </div>

                <div className="store_button_container">
                    <button type="submit" className="store_button">
                        Delete Movie
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteMovie;
