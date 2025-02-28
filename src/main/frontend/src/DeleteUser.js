import React, { useState } from "react";
import axios from "axios";

function DeleteUser(props) {
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState(null);

    const handleDeleteUser = () => {
        if(!props.auth || (props.cred.trim() === "")){
            setMessage("you are not logged in");
            return;
        }
        axios.delete(`http://localhost:8080/users/${userId}`, {
            headers: {
                "Authorization": props.cred
            }
        })
            .then(response => {
                console.log("deleting user with id: " + userId);
                setMessage("user deleted");
            })
            .catch(error => {
                if(error.response && error.response.status === 404){
                    setMessage("there is no user with id: " + userId);
                    console.log("user with id: " + userId + " not found")
                } else {
                    console.log("user with id: " + userId + " not deleted")
                    setMessage("user NOT deleted");
                }
            });
    };

    return (
        <div style={{ padding: "20px", textAlign: "center", border: "1px solid black" }}>
            <h1>deleting user by id:</h1>
            <div>
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="enter id"
                    style={{ padding: "5px 8px", margin: "10px" }}
                />
                <button
                    onClick={handleDeleteUser}
                    style={{ padding: "5px 8px" }}
                >
                    delete user
                </button>
            </div>
            {message && <p style={{ color: "red" }}>{message}</p>}
        </div>
    );
}

export default DeleteUser;
