import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        token: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log("data:", formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviar dados para o backend (usando fetch ou outra biblioteca de requisições HTTP)

        fetch("http://localhost:8000/api/signUp", {
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
                alert(data.message);
                navigate("/login");
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message);
            });
    };

    return (
        <div className="register_container">
            <form className="register_form" onSubmit={handleSubmit}>
                <h1 className="register_header">Register</h1>
                <br></br>
                <div className="username_container">
                    <label htmlFor="username" className="username_label">
                        Username
                    </label>
                    <br></br>
                    <input
                        type="text"
                        className="username_input"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="password_container">
                    <label htmlFor="password" className="password_label">
                        Password
                    </label>
                    <br></br>
                    <input
                        type="password"
                        className="password_input"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="token_container">
                    <label htmlFor="token" className="token_label">
                        Token
                    </label>
                    <br></br>
                    <input
                        type="text"
                        className="token_input"
                        id="token"
                        name="token"
                        value={formData.token}
                        onChange={handleChange}
                    />
                </div>
                <div className="register_button_container">
                    <button type="submit" className="register_button">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
