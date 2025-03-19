import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = "http://localhost/backend";

const Statistics = () => {
    const [estadisticas, setEstadisticas] = useState({ promedio: 0, minimo: 0, maximo: 0 });

    useEffect(() => {
        axios.get(`${API_URL}/estadisticas.php`)
            .then((response) => setEstadisticas(response.data))
            .catch((error) => console.error("Error al obtener estadísticas:", error));
    }, []);

    const data = {
        labels: ["Promedio", "Mínimo", "Máximo"],
        datasets: [{
            label: "Insulina Lenta",
            data: [estadisticas.promedio, estadisticas.minimo, estadisticas.maximo],
            backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
        }]
    };

    return (
        <div>
            <h2>Estadísticas de Insulina Lenta</h2>
            <Bar data={data} />
        </div>
    );
};

export default Statistics;
