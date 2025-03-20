import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const API_URL = "http://localhost/backend/estadisticas.php";

const Statistics = () => {
    const [estadisticas, setEstadisticas] = useState({ promedio: 0, minimo: 0, maximo: 0 });
    const [evolucion, setEvolucion] = useState([]);
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [anio, setAnio] = useState(new Date().getFullYear());
    const [error, setError] = useState("");

    useEffect(() => {
        obtenerEstadisticas();
    }, [mes, anio]);

    const obtenerEstadisticas = async () => {
        try {
            console.log(`📡 Consultando estadísticas para Mes: ${mes}, Año: ${anio}`);

            const response = await axios.get(`${API_URL}?mes=${mes}&anio=${anio}`);
            console.log("📊 Datos recibidos:", response.data);

            if (response.data.error) {
                console.error("⚠️ Error en el servidor:", response.data.error);
                setError(response.data.error);
            } else {
                setEstadisticas(response.data.estadisticas || { promedio: 0, minimo: 0, maximo: 0 });
                setEvolucion(response.data.evolucion || []);
                setError("");
            }
        } catch (error) {
            console.error("❌ Error al obtener estadísticas:", error);
            setError("No se pudieron cargar las estadísticas.");
        }
    };

    return (
        <div>
            <h2>📊 Estadísticas de Insulina Lenta</h2>

            {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

            <div>
                <label>Selecciona un mes:</label>
                <select value={mes} onChange={(e) => setMes(Number(e.target.value))}>
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("es", { month: "long" })}
                        </option>
                    ))}
                </select>

                <label>Selecciona un año:</label>
                <select value={anio} onChange={(e) => setAnio(Number(e.target.value))}>
                    {[...Array(5)].map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={year} value={year}>{year}</option>;
                    })}
                </select>
            </div>

            <h3>📌 Valores Estadísticos</h3>
            <Bar
                data={{
                    labels: ["Promedio", "Mínimo", "Máximo"],
                    datasets: [
                        {
                            label: "LENTA",
                            data: [estadisticas.promedio, estadisticas.minimo, estadisticas.maximo],
                            backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
                        },
                    ],
                }}
            />

            <h3>📈 Evolución de Insulina Lenta</h3>
            <Line
                data={{
                    labels: evolucion.map((item) => `Día ${item.dia}`),
                    datasets: [
                        {
                            label: "LENTA",
                            data: evolucion.map((item) => item.valor),
                            borderColor: "rgba(75,192,192,1)",
                            backgroundColor: "rgba(75,192,192,0.2)",
                            fill: true,
                        },
                    ],
                }}
            />
        </div>
    );
};

export default Statistics;
