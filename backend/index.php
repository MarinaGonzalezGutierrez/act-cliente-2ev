<?php
header("Content-Type: application/json");
include "config.php";

$request = $_GET["endpoint"] ?? "";

switch ($request) {
    case "usuarios":
        include "usuarios.php";
        break;
    case "estadisticas":
        include "estadisticas.php";
        break;
    default:
        echo json_encode(["error" => "Endpoint no válido"]);
        break;
}
?>
