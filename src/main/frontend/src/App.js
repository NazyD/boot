import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState, useEffect} from "react";
import AllUsers from "./AllUsers";
import FindUser from "./FindUser";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import axios from "axios";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cred, setCred] = useState("");

    useEffect(() => {
        // pro zjištění (lokální) zda je uživatel přihlášen už a nebo ne i po restartu apky
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");
        const storedCredential = localStorage.getItem("credentials");
        if (storedUsername && storedPassword) {
            setAuthenticated(true);
            setUsername(storedUsername);
            setPassword(storedPassword);
            setCred(storedCredential);
        }
    }, []);

    // volání loginu s basic autorizací
    const login = () => {
        const credentials = `Basic ${btoa(username + ":" + password)}`;

        axios.post("http://localhost:8080/login", null, {
            headers: {
                "Authorization": credentials
            }
        })
            .then(response => {
                // při úspěšném volání nastaví potřebná data
                setAuthenticated(true);
                setErrorMessage("");
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                localStorage.setItem("credentials", credentials)
                setCred(credentials);
            })
            .catch(error => {
                console.error("Login failed", error);
                setErrorMessage("Login failed, please check your credentials");
            });
    };

    const logout = () => {
        // odebrání a vyčištění od aktuálních dat plus refresh pro zavření otevřených případných komponent
        // které mají data které se bez přihlášení nemají zobrazovat
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("credentials");
        setAuthenticated(false);
        setUsername("");
        setPassword("");
        setCred("");
        window.location.reload();
    };

    return (
        <Router>
            <div style={{padding: "20px", textAlign: "center"}}>
                <div style={{marginBottom: "20px"}}>
                    {authenticated ? (
                        <div>
                            <p>you are logged in as: {username}</p>
                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <p>you are not logged in</p>
                            <input
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button onClick={login}>login</button>
                            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                        </div>
                    )}
                </div>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                {/*komponenty pro všechny i nepřihlášeného uživatele*/}
                                <AllUsers/>
                                <FindUser/>
                                {authenticated &&
                                    <>
                                        {/*komponenty pro admina plus přihlášeného uživatele*/}
                                        {localStorage.getItem("username") === "admin" ?
                                            (
                                                <>
                                                    <CreateUser auth={authenticated} cred={cred}/>
                                                    <DeleteUser auth={authenticated} cred={cred}/>
                                                    <UpdateUser auth={authenticated} cred={cred}/>
                                                </>
                                            ) : (<UpdateUser auth={authenticated} cred={cred}/>)}
                                    </>
                                }
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
        ;
}

export default App;
