import {useState} from "react";
import axios from "axios";

function CreateUser(props) {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");

    const handleCreateUser = () => {
        if(!props.auth || (props.cred.trim() === "")){
            setMessage("you are not logged in");
            return;
        }
        if (lastName === null || lastName.trim() === "") {
            setMessage("last name cannot be empty");
            return;
        }
        if (username === null || username.trim() === "") {
            setMessage("username cannot be empty");
            return;
        }
        if (password === null || password.trim() === "") {
            setMessage("password cannot be empty");
            return;
        }

        const userData = {
            firstName: firstName && firstName.trim() !== "" ? firstName : null,
            lastName: lastName.trim() !== "" ? lastName : null,
            username: username.trim() !== "" ? username : null,
            password: password.trim() !== "" ? password : null
        };

        axios.post(`http://localhost:8080/users/`, userData, {
            headers: {
                "Authorization": props.cred
            }
        })
            .then(response => {
                console.log("creating user", response.data);
                setFirstName(null);
                setLastName(null);
                setUsername(null);
                setPassword(null);
                setMessage("user created");
            })
            .catch(error => {
                console.error("error creating user:", error);
                console.log("user not created")
            });
    };

    return (
        <div style={{padding: "20px", textAlign: "center", border: "1px solid black"}}>
            <h1>create user:</h1>
            <button onClick={() => setShowForm(true)} style={{padding: "5px 8px"}}>
                create user
            </button>
            {showForm && (
                <div>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="first name"
                        style={{padding: "5px 8px", margin: "10px"}}
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="last name"
                        style={{padding: "5px 8px", margin: "10px"}}
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        style={{padding: "5px 8px", margin: "10px"}}
                    />
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        style={{padding: "5px 8px", margin: "10px"}}
                    />
                    {message && <p style={{color: "red"}}>{message}</p>}
                    <button onClick={handleCreateUser} style={{padding: "5px 8px"}}>
                        create
                    </button>
                    <button onClick={() => setShowForm(false)} style={{padding: "5px 8px"}}>
                        close form
                    </button>
                </div>
            )}
        </div>
    );
}

export default CreateUser;