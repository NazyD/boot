import React, {useEffect, useState} from "react";
import axios from "axios";

// úprava uživatele
function UpdateUser(props) {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState("");

    // hádám že by mohl být problém i s úpravou/odstraněním toho daného přihlášeného uživatele
    // jak by se aplikace chovala ?? TODO

    // volání pro získání id uživatele dle usernamu přihlášeného uživatele
    // to je potřeba pro automatické vyplnění jeho id do formuláře pro úpravu aby
    // mu aplikace neumožnila vyplnit jiné id pro úpravu jiného uživatele ale pouze sebe
    useEffect( () => {
        const username = localStorage.getItem("username");
        axios.get(`http://localhost:8080/users/username/${username}`, {
            headers: {
                "Authorization": props.cred
            }
        })
            .then(response => {
                console.log("looking for user with username: " + username);
                setUser(response.data);
                setUserId(response.data.id);
            })
            .catch(error => {
                console.log("user with username: " + username + " not found")
                setMessage("user not found");
                setUser(null);
                setUserId(null);
            });
    }, []);
    console.log(user);

    // volání be
    const handleUpdateUser = () => {
        if (!props.auth || (props.cred.trim() === "")) {
            setMessage("you are not logged in");
            return;
        }
        if (!userId) {
            setMessage("you need to set user id");
            return;
        }
        if ((firstName === null || firstName.trim() === "")
            && (lastName === null || lastName.trim() === "")
            && (login === null || login.trim() === "")
            && (password === null || password.trim() === "")) {
            setMessage("if you want to update user, set at least one parameter you want to update");
            return;
        }

        const userData = {
            firstName: firstName === null || firstName.trim() === "" ? null : firstName,
            lastName: lastName === null || lastName.trim() === "" ? null : lastName,
            login: login === null || login.trim() === "" ? null : login,
            password: password === null || password.trim() === "" ? null : password
        };

        axios.patch(`http://localhost:8080/users/${userId}`, userData, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": props.cred
            },
        })
            .then(response => {
                setMessage("user with id " + userId + " was updated");
                console.log("user updated");
            }).catch(error => {
                setMessage("failed to update user with id " + userId);
                console.error("user not updated");
            }
        );
    }

    return (
        <div style={{padding: "20px", textAlign: "center", border: "1px solid black"}}>
            <h1>update user:</h1>
            <div>
                {/*admin má možnost vyplňovat id aby mohl odstranit kohokoliv, přihlášený uživatel pouze sebe*/}
                {localStorage.getItem("username") === "admin" ?
                    (<input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="enter id"
                        style={{padding: "5px 8px", margin: "10px"}}
                    />) :
                    (<input
                        type="number"
                        value={userId || ""}
                        disabled
                        placeholder="enter id"
                        style={{padding: "5px 8px", margin: "10px"}}
                    />)}

                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="enter first name"
                    style={{padding: "5px 8px", margin: "10px"}}
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="enter last name"
                    style={{padding: "5px 8px", margin: "10px"}}
                />
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="enter login"
                    style={{padding: "5px 8px", margin: "10px"}}
                />
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="enter password"
                    style={{padding: "5px 8px", margin: "10px"}}
                />
                <button
                    onClick={handleUpdateUser}
                    style={{padding: "5px 8px"}}
                >
                    update user
                </button>
                {message && <p style={{color: "red"}}>{message}</p>}
            </div>
        </div>
    );
}

export default UpdateUser;