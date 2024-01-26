import React from "react";
import { Link } from "react-router-dom";
function AdminPanel() {
    return (
        <div className="login_container">
            <div className="login_form">
                <Link to={`/store`}>
                    <button>Botao1</button>
                </Link>

                <br></br>
                <Link to={`/delete`}>
                    <button>Botao2</button>
                </Link>
            </div>
        </div>
    );
}

export default AdminPanel;
