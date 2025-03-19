import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/backend"; // Asegúrate de que la URL sea correcta

const UserManagement = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNac, setFechaNac] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Cargar los usuarios al cargar el componente
    useEffect(() => {
        axios.get(`${API_URL}/usuarios.php`)  // Asegúrate de que esta URL sea la correcta para el GET
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setUsuarios(response.data);
                } else {
                    console.error("La respuesta no es un array:", response.data);
                    setUsuarios([]);  // Establecer como un array vacío si la respuesta no es válida
                }
            })
            .catch((error) => {
                console.error("Error al obtener usuarios:", error);
                setUsuarios([]);  // Establecer como un array vacío en caso de error
            });
    }, []);

    // Función para agregar un usuario
    const agregarUsuario = () => {
        axios.post(`${API_URL}/usuarios.php`, {
            nombre, apellido, fechaNac, username, password
        }, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if (response.data.success) {
                alert("Usuario agregado correctamente");
                // Crear un nuevo objeto usuario que se va a agregar al estado.
                const nuevoUsuario = { nombre, apellido, fechaNac, username };
                // Actualizar el estado con el nuevo usuario agregado
                setUsuarios(prevUsuarios => [...prevUsuarios, nuevoUsuario]);
            } else {
                alert("Error al agregar usuario: " + response.data.error);
            }
        })
        .catch((error) => {
            console.error("Error al agregar usuario:", error);
            alert("Error al agregar usuario. Revisa la consola.");
        });
    };

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <input 
                type="text" 
                placeholder="Nombre" 
                onChange={(e) => setNombre(e.target.value)} 
                value={nombre}
            />
            <input 
                type="text" 
                placeholder="Apellido" 
                onChange={(e) => setApellido(e.target.value)} 
                value={apellido}
            />
            <input 
                type="date" 
                onChange={(e) => setFechaNac(e.target.value)} 
                value={fechaNac}
            />
            <input 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username}
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
            />
            <button onClick={agregarUsuario}>Agregar Usuario</button>

            <h2>Usuarios Registrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha Nacimiento</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mostrar los usuarios */}
                    {Array.isArray(usuarios) && usuarios.map((user, index) => (
                        <tr key={index}>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.fechaNac}</td>
                            <td>{user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
