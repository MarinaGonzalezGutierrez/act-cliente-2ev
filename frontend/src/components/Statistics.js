import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const API_URL = "http://localhost:80/backend";

const Statistics = () => {
    const [estadisticas, setEstadisticas] = useState({ promedio: 0, minimo: 0, maximo: 0 });
    const [evolucion, setEvolucion] = useState([]);
    const [mes, setMes] = useState(new Date().getMonth() + 1); // Mes actual
    const [anio, setAnio] = useState(new Date().getFullYear()); // Año actual

    useEffect(() => {
        obtenerEstadisticas();
    }, [mes, anio]); // Se ejecuta cuando cambian mes o año

    const obtenerEstadisticas = () => {
        axios.get(`${API_URL}/estadisticas.php?mes=${mes}&anio=${anio}`)
            .then((response) => {
                console.log("Datos recibidos:", response.data); // Verifica la respuesta
                if (response.data && typeof response.data === "object") {
                    setEstadisticas(response.data.estadisticas || { promedio: 0, minimo: 0, maximo: 0 });
                    setEvolucion(response.data.evolucion || []);
                } else {
                    setEstadisticas({ promedio: 0, minimo: 0, maximo: 0 });
                    setEvolucion([]);
                }
            })
            .catch((error) => {
                console.error("Error al obtener estadísticas:", error);
                setEstadisticas({ promedio: 0, minimo: 0, maximo: 0 });
                setEvolucion([]);
            });
    };

    const barData = {
        labels: ["Promedio", "Mínimo", "Máximo"],
        datasets: [{
            label: "Insulina Lenta",
            data: [
                estadisticas.promedio ?? 0, 
                estadisticas.minimo ?? 0, 
                estadisticas.maximo ?? 0
            ],
            backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
        }]
    };

    const lineData = {
        labels: evolucion.map(item => `Día ${item.dia}`),
        datasets: [{
            label: "Evolución Insulina Lenta",
            data: evolucion.map(item => item.valor),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: true,
        }]
    };

    return (
        <div>
            <h2>Estadísticas de Insulina Lenta</h2>

            {/* Selección de mes y año */}
            <div>
                <label>Selecciona un mes:</label>
                <select value={mes} onChange={(e) => setMes(Number(e.target.value))}>
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString("es", { month: "long" })}</option>
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

            {/* Gráficos */}
            <div>
                <h3>Valores Estadísticos</h3>
                <Bar data={barData} />
            </div>
            <div>
                <h3>Evolución de Insulina Lenta</h3>
                <Line data={lineData} />
            </div>
        </div>
    );
};

export default Statistics;