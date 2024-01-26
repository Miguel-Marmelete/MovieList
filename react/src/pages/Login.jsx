import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
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

        fetch("http://localhost:8000/api/login", {
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
                //console.log("Resposta do backend:", data);
                sessionStorage.setItem("username", data.username);
                alert("Login feito com sucesso");
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message);
            });
    };
    return (
        <div className="login_container">
            <form className="login_form" onSubmit={handleSubmit}>
                <h1 className="login_header">Login</h1>
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
                <div className="login_button_container">
                    <button type="submit" className="login_button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
