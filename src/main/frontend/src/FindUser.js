import React, {useState} from "react";
import axios from "axios";

function FindUser() {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const username = localStorage.getItem("username");

    const handleFindUser = () => {
        const credential = `Basic ${btoa("reader:test")}`
        if (userId === null || userId === "") {
            setError("you need to enter some id to find user");
            return;
        }
        axios.get(`http://localhost:8080/users/id/${userId}`, {
            headers: {
                "Authorization": credential
            }
        })
            .then(response => {
                console.log("looking for user with id: " + userId);
                setUser(response.data);
                setError(null);
            })
            .catch(error => {
                console.log("user with id: " + userId + " not found")
                setError("user not found");
                setUser(null);
            });
    };

    return (
        <div style={{padding: "20px", textAlign: "center", border: "1px solid black"}}>
            <h1>getter user by id:</h1>
            <div>
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="enter id"
                    style={{padding: "5px 8px", margin: "10px"}}
                />
                <button
                    onClick={handleFindUser}
                    style={{padding: "5px 8px"}}
                >
                    find user
                </button>
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            {user && (
                <div>
                    <table border="1" cellPadding="5" cellSpacing="0" style={{margin: "10px auto"}}>
                        <tbody>
                        {Object.entries(user).map(([key, value]) => {
                            if (username !== "admin" && key === "password") {
                                return (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td style={{color: "red"}}>no access</td>
                                    </tr>);
                            } else {
                                return (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                    </tr>);
                            }
                        })}
                        </tbody>
                    </table>
                    <button onClick={() => setUser(null)} style={{padding: "5px 8px"}}>
                        close table
                    </button>
                </div>
            )}
        </div>
    );
}

export default FindUser;
