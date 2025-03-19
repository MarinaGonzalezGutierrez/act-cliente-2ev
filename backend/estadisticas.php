<?php
include "config.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $mes = $_GET["mes"] ?? date("m");  // Si no se especifica, usa el mes actual
    $anio = $_GET["anio"] ?? date("Y"); 

    $sql = "SELECT AVG(lenta) AS promedio, MIN(lenta) AS minimo, MAX(lenta) AS maximo 
            FROM controlglucosa 
            WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $mes, $anio);
    $stmt->execute();
    $result = $stmt->get_result();
    $estadisticas = $result->fetch_assoc();

    echo json_encode($estadisticas);
}
?>
