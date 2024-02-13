import React, { useState } from "react";

const API_ENDPOINT = "http://localhost:8000/api/movie/delete";

function DeleteMovie() {
    const [formData, setFormData] = useState({
        movie_id: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const clearForm = () => {
        setFormData({
            movie_id: "",
        });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            console.log("Resposta do backend:", data);
            alert(data.message);
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }

        clearForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDelete();
    };

    return (
        <div className="delete_container">
            <form className="delete_form" onSubmit={handleSubmit}>
                <h1 className="delete_header">Delete Movie</h1>

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

                <div className="delete_button_container">
                    <button type="submit" className="delete_button">
                        Delete Movie
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteMovie;
