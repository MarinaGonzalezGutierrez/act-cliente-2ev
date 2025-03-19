<?php
include "config.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // Obtener los datos enviados en la solicitud
    $data = json_decode(file_get_contents("php://input"), true);
    
    $username = $data["username"] ?? null;
    $nombre = $data["nombre"] ?? null;
    $apellido = $data["apellido"] ?? null;
    $fechaNac = $data["fechaNac"] ?? null;
    $password = isset($data["password"]) && !empty($data["password"]) ? password_hash($data["password"], PASSWORD_BCRYPT) : null;

    if (!$username || !$nombre || !$apellido || !$fechaNac) {
        echo json_encode(["error" => "Faltan datos obligatorios"]);
        exit;
    }

    // Construir la consulta SQL dinámicamente
    $sql = "UPDATE usuario SET nombre = ?, apellido = ?, fechaNac = ?";
    $params = [$nombre, $apellido, $fechaNac];
    $types = "sss";

    if ($password) {
        $sql .= ", password = ?";
        $params[] = $password;
        $types .= "s";
    }

    $sql .= " WHERE username = ?";
    $params[] = $username;
    $types .= "s";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Usuario actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar el usuario"]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
