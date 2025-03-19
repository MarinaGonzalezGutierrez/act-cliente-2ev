<?php
include "config.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $mes = isset($_GET["mes"]) ? intval($_GET["mes"]) : date("m");
    $anio = isset($_GET["anio"]) ? intval($_GET["anio"]) : date("Y");

    // Verificar conexión a la base de datos
    if (!$conn) {
        echo json_encode(["error" => "Error de conexión a la base de datos"]);
        exit();
    }

    // Consulta para estadísticas generales
    $sql_estadisticas = "SELECT AVG(lenta) AS promedio, MIN(lenta) AS minimo, MAX(lenta) AS maximo 
                         FROM controlglucosa 
                         WHERE MONTH(fecha) = ? AND YEAR(fecha) = ? AND lenta IS NOT NULL";

    if ($stmt = $conn->prepare($sql_estadisticas)) {
        $stmt->bind_param("ii", $mes, $anio);
        $stmt->execute();
        $result = $stmt->get_result();
        $estadisticas = $result->fetch_assoc() ?? ["promedio" => 0, "minimo" => 0, "maximo" => 0];
    } else {
        echo json_encode(["error" => "Error en la consulta SQL: " . $conn->error]);
        exit();
    }

    // Consulta para evolución diaria de 'lenta'
    $sql_evolucion = "SELECT DAY(fecha) AS dia, AVG(lenta) AS valor 
                       FROM controlglucosa 
                       WHERE MONTH(fecha) = ? AND YEAR(fecha) = ? AND lenta IS NOT NULL 
                       GROUP BY DAY(fecha) 
                       ORDER BY dia ASC";

    if ($stmt = $conn->prepare($sql_evolucion)) {
        $stmt->bind_param("ii", $mes, $anio);
        $stmt->execute();
        $result = $stmt->get_result();
        $evolucion = [];
        while ($row = $result->fetch_assoc()) {
            $evolucion[] = ["dia" => intval($row["dia"]), "valor" => floatval($row["valor"] ?? 0)];
        }
    } else {
        echo json_encode(["error" => "Error en la consulta SQL: " . $conn->error]);
        exit();
    }

    // Respuesta final con estadísticas y evolución diaria
    echo json_encode([
        "estadisticas" => [
            "promedio" => floatval($estadisticas["promedio"] ?? 0),
            "minimo" => floatval($estadisticas["minimo"] ?? 0),
            "maximo" => floatval($estadisticas["maximo"] ?? 0)
        ],
        "evolucion" => $evolucion
    ]);
}
?>