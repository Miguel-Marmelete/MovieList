import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = "http://localhost:8000/api/movie/store";

function StoreMovie() {
    const navigate = useNavigate();
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
    };

    const clearForm = () => {
        setFormData({
            movie_title: "",
            movie_rating: "",
            movie_description: "",
            movie_poster_path: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw await response.json();
            }

            const data = await response.json();
            console.log("Resposta do backend:", data);
            alert(data.message);
        } catch (error) {
            console.error("Erro no backend:", error.message);
            alert(error.message);
        }

        clearForm();
    };

    return (
        <div className="store_container">
            <form className="store_form" onSubmit={handleSubmit}>
                <h1 className="store_header">Store Movie</h1>
                <div className="movie_title_container">
                    <label htmlFor="movie_title" className="movie_title_label">
                        Movie Title
                    </label>
                    <input
                        type="text"
                        className="movie_title_input"
                        id="movie_title"
                        name="movie_title"
                        value={formData.movie_title}
                        onChange={handleChange}
                        required
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
                        required
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
                        required
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
                        required
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
