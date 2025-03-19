<?php
include "config.php";
header("Content-Type: application/json");

// Verificar si la solicitud es GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Consulta para obtener todos los usuarios
    $sql = "SELECT id, nombre, apellido, fechaNac, username FROM usuario";
    $result = $conn->query($sql);

    // Verificar si hay usuarios
    if ($result->num_rows > 0) {
        $usuarios = [];
        while ($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }
        // Devolver los usuarios como respuesta
        echo json_encode($usuarios);
    } else {
        echo json_encode([]);
    }
}

// Verificar si la solicitud es POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(["error" => "Datos de entrada no válidos"]);
        exit;
    }

    $nombre = $data["nombre"] ?? "";
    $apellido = $data["apellido"] ?? "";
    $fechaNac = $data["fechaNac"] ?? "";
    $username = $data["username"] ?? "";
    $password = password_hash($data["password"], PASSWORD_BCRYPT);

    if (empty($nombre) || empty($apellido) || empty($fechaNac) || empty($username) || empty($password)) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit;
    }

    // Preparar la consulta para insertar el nuevo usuario
    $sql = "INSERT INTO usuario (nombre, apellido, fechaNac, username, password) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $nombre, $apellido, $fechaNac, $username, $password);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Recuperar todos los usuarios después de la inserción
        $sql_select = "SELECT id, nombre, apellido, fechaNac, username FROM usuario";
        $result = $conn->query($sql_select);

        // Verificar si hay usuarios
        if ($result->num_rows > 0) {
            $usuarios = [];
            while ($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }
            // Devolver los usuarios como respuesta
            echo json_encode(["success" => true, "usuarios" => $usuarios]);
        } else {
            echo json_encode(["success" => true, "usuarios" => []]);
        }
    } else {
        echo json_encode(["error" => "Error al insertar usuario"]);
    }
}
?>
