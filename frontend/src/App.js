import React from "react";
import UserManagement from "./components/UserManagement";
import Statistics from "./components/Statistics"; // ✅ Asegúrate de que está bien escrito

const App = () => {
    return (
        <div>
            <h1>Control de Diabetes</h1>
            <UserManagement />
            <Statistics /> {/* Asegúrate de que está dentro del JSX */}
        </div>
    );
};

export default App;
