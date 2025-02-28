import React, {useState} from "react";
import axios from "axios";

// komponenta získání všech uživatelů v tabulce
function AllUsers() {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("")
    const username = localStorage.getItem("username");

    // volání pro získání dat všech uživatelů z db
    const fetchUsers = () => {
        const credentials = `Basic ${btoa("reader:test")}`
        axios.get("http://localhost:8080/users/", {
            headers: {
                "Authorization": credentials
            }
        })
            .then(response => {
                const data = response.data;
                setUsers(data);
                if (data.length > 0) {
                    setColumns(Object.keys(data[0]));
                }
                setIsLoaded(true);
            })
            .catch(error => {
                console.error("Error getting all users:", error);
            });
    };

    return (
        <div style={{padding: "20px", textAlign: "center", border: "1px solid black" }}>
            <h1>getter to load all users:</h1>
            {!isLoaded ? (
                <>
                    <button onClick={fetchUsers} style={{padding: "5px 8px"}}>
                        load users
                    </button>
                    {message && <p style={{color: "red"}}>{message}</p>}
                </>
            ) : users.length === 0 ? (
                <p>no users found</p>
            ) : (
                <>
                    {/*zobrazení tabulky pouze v případě kdy máme data*/}
                    <table border="1" cellPadding="5" cellSpacing="0" style={{margin: "10px auto"}}>
                        <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column}>{column}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                {columns.map((column) => {
                                    // v případě kdy přihlášený uživatel není admin data o heslu se nezobrazí
                                    if(username !== "admin" && column === "password"){
                                        return(<td style={{color: "red"}}>no access</td>);
                                    } else {
                                        return(<td key={column}>{user[column]}</td>);
                                    }

                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={() => setIsLoaded(!isLoaded)} style={{padding: "5px 8px"}}>
                        close table
                    </button>
                </>
            )
            }
        </div>
    )
        ;
}

export default AllUsers;
