import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:80/backend"; // Asegúrate de que la URL sea correcta

const UserManagement = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNac, setFechaNac] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Cargar los usuarios al cargar el componente
    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = () => {
        axios.get(`${API_URL}/usuarios.php`)
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
    };

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
                obtenerUsuarios(); // Recargar la lista de usuarios después de agregar uno nuevo
            } else {
                alert("Error al agregar usuario: " + response.data.error);
            }
        })
        .catch((error) => {
            console.error("Error al agregar usuario:", error);
            alert("Error al agregar usuario. Revisa la consola.");
        });
    };

    // Función para eliminar un usuario
    const eliminarUsuario = (idUsuario) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            return;
        }
    
        axios.delete(`${API_URL}/eliminar_usuario.php`, {
            data: JSON.stringify({ idUsuario }),  // 🔹 Enviar datos como JSON
            headers: { "Content-Type": "application/json" } // 🔹 Importante para que PHP lo interprete bien
        })
        .then((response) => {
            if (response.data.success) {
                alert("Usuario eliminado correctamente");
                obtenerUsuarios(); // Recargar la lista después de eliminar un usuario
            } else {
                alert("Error al eliminar usuario: " + response.data.error);
            }
        })
        .catch((error) => {
            console.error("Error al eliminar usuario:", error);
            alert("No se pudo eliminar el usuario.");
        });
    };

    // Función para modificar un usuario
    const modificarUsuario = (username, nuevosDatos) => {
        axios.put(`${API_URL}/modificar_usuario.php`, {
            username,
            nombre: nuevosDatos.nombre,
            apellido: nuevosDatos.apellido,
            fechaNac: nuevosDatos.fechaNac,
            password: nuevosDatos.password || undefined // No se envía si está vacío
        }, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if (response.data.success) {
                alert("Usuario actualizado correctamente");
                obtenerUsuarios(); // Recargar la lista después de modificar
            } else {
                alert("Error al actualizar usuario: " + response.data.error);
            }
        })
        .catch((error) => {
            console.error("Error al actualizar usuario:", error);
            alert("No se pudo actualizar el usuario.");
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mostrar los usuarios */}
                    {Array.isArray(usuarios) && usuarios.map((user) => (
                        <tr key={user.idUsuario}>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.fechaNac}</td>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => eliminarUsuario(user.idUsuario)}>
                                    Eliminar
                                </button>
                                <button onClick={() => {
                                    const nuevosDatos = {
                                        nombre: prompt("Nuevo nombre:", user.nombre),
                                        apellido: prompt("Nuevo apellido:", user.apellido),
                                        fechaNac: prompt("Nueva fecha de nacimiento (YYYY-MM-DD):", user.fechaNac),
                                        password: prompt("Nueva contraseña (déjalo vacío si no quieres cambiarlo):")
                                    };
                                    modificarUsuario(user.username, nuevosDatos);
                                }}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
