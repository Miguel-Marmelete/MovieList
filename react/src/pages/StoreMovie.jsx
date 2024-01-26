import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function StoreMovie() {
    //const navigate = useNavigate();
    const [formData, setFormData] = useState({
        movie_title: "",
        movie_rating: "",
        movie_description: "",
        movie_poster_path: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log("data:", formData);
    };

    const clearForm = () => {
        setFormData({
            movie_title: "",
            movie_rating: "",
            movie_description: "",
            movie_poster_path: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8000/api/store", {
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
                alert("Filme adicionado com sucesso");
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
                <h1 className="store_header">Store Movie</h1>
                <br></br>
                <div className="movie_title_container">
                    <label htmlFor="movie_title" className="movie_title_label">
                        Movie Title
                    </label>
                    <br></br>
                    <input
                        type="text"
                        className="movie_title_input"
                        id="movie_title"
                        name="movie_title"
                        value={formData.movie_title}
                        onChange={handleChange}
                    />
                </div>

                <div className="movie_rating_container">
                    <label
                        htmlFor="movie_rating"
                        className="movie_rating_label"
                    >
                        Movie Rating
                    </label>
                    <br></br>
                    <input
                        type="text"
                        className="movie_rating_input"
                        id="movie_rating"
                        name="movie_rating"
                        value={formData.movie_rating}
                        onChange={handleChange}
                    />
                </div>

                <div className="movie_description_container">
                    <label
                        htmlFor="movie_description"
                        className="movie_description_label"
                    >
                        Movie Description
                    </label>
                    <br></br>
                    <input
                        type="text"
                        className="movie_description_input"
                        id="movie_description"
                        name="movie_description"
                        value={formData.movie_description}
                        onChange={handleChange}
                    />
                </div>

                <div className="movie_poster_path_container">
                    <label
                        htmlFor="movie_poster_path"
                        className="movie_poster_path_label"
                    >
                        Movie Path
                    </label>
                    <br></br>
                    <input
                        type="text"
                        className="movie_poster_path_input"
                        id="movie_poster_path"
                        name="movie_poster_path"
                        value={formData.movie_poster_path}
                        onChange={handleChange}
                    />
                </div>

                <div className="store_button_container">
                    <button type="submit" className="store_button">
                        Store Movie
                    </button>
                </div>
            </form>
        </div>
    );
}

export default StoreMovie;
