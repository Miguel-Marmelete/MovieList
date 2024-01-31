import React from "react";
import { Link } from "react-router-dom";
function AdminPanel() {
    return (
        <div className="login_container">
            <div className="login_form">
                <Link to={`/store`}>
                    <button className="store_movie_button">Store Movie</button>
                </Link>

                <br></br>
                <Link to={`/delete`}>
                    <button className="delete_movie_button">
                        Delete Movie
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default AdminPanel;
