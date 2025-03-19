<?php
include "config.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    // Responder al preflight de CORS
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Obtener los datos enviados en la solicitud
    $data = json_decode(file_get_contents("php://input"), true);
    $idUsuario = $data["idUsuario"] ?? null;

    if (!$idUsuario) {
        echo json_encode(["error" => "Se requiere el idUsuario"]);
        exit;
    }

    // Preparar la consulta SQL para eliminar el usuario
    $sql = "DELETE FROM usuario WHERE idUsuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idUsuario);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Usuario eliminado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al eliminar el usuario"]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
