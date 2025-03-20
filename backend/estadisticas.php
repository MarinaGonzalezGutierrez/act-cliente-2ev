<?php
// HABILITAR ERRORES PARA DEPURACIÓN
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "config.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Obtener mes y año desde la URL
$mes = isset($_GET["mes"]) ? intval($_GET["mes"]) : date("m");
$anio = isset($_GET["anio"]) ? intval($_GET["anio"]) : date("Y");

// Verificar conexión
if (!$conn) {
    echo json_encode(["error" => "No se pudo conectar a la base de datos"]);
    exit();
}

// CONSULTA: Estadísticas generales de LENTA
$sql_estadisticas = "SELECT 
                        IFNULL(AVG(lenta), 0) AS promedio, 
                        IFNULL(MIN(lenta), 0) AS minimo, 
                        IFNULL(MAX(lenta), 0) AS maximo 
                     FROM controlglucosa 
                     WHERE MONTH(fecha) = ? AND YEAR(fecha) = ? AND lenta IS NOT NULL";

$stmt = $conn->prepare($sql_estadisticas);
if (!$stmt) {
    echo json_encode(["error" => "Error en SQL: " . $conn->error]);
    exit();
}
$stmt->bind_param("ii", $mes, $anio);
$stmt->execute();
$result = $stmt->get_result();
$estadisticas = $result->fetch_assoc();

// CONSULTA: Evolución diaria de LENTA
$sql_evolucion = "SELECT DAY(fecha) AS dia, IFNULL(AVG(lenta), 0) AS valor 
                  FROM controlglucosa 
                  WHERE MONTH(fecha) = ? AND YEAR(fecha) = ? 
                  GROUP BY DAY(fecha) 
                  ORDER BY dia ASC";

$stmt = $conn->prepare($sql_evolucion);
if (!$stmt) {
    echo json_encode(["error" => "Error en SQL: " . $conn->error]);
    exit();
}
$stmt->bind_param("ii", $mes, $anio);
$stmt->execute();
$result = $stmt->get_result();
$evolucion = [];
while ($row = $result->fetch_assoc()) {
    $evolucion[] = ["dia" => intval($row["dia"]), "valor" => floatval($row["valor"])];
}

// RESPUESTA JSON
echo json_encode([
    "estadisticas" => [
        "promedio" => floatval($estadisticas["promedio"]),
        "minimo" => floatval($estadisticas["minimo"]),
        "maximo" => floatval($estadisticas["maximo"])
    ],
    "evolucion" => $evolucion
]);
?>
