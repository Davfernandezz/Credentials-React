import { useEffect, useState } from "react";
import { CSelect } from "../../components/CSelect/CSelect";
import { createAppointments } from "../../services/apiCalls";

export const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        user_id: "",
        service_id: "",
        Date: "",
    });

    const inputHandler = (e) => {
        if (e.target.value === "Elige el servicio") {
            console.log("You cannot pass");
            return;
        }
        console.log(e.target.value);
        setNewAppointment({
            ...newAppointment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSendAppointment = async () => {
        try {
            const response = await createAppointments(newAppointment, token);
            if (response.success) {
                console.log(response);
            }
        } catch (error) {
            console.error("Error sending appointment:", error);
        }
    };

    const services = [
        { id: 1, serviceName: "Tatuajes personalizados" },
        { id: 2, serviceName: "Tatuajes del catálogo" },
        { id: 3, serviceName: "Restauración y rejuvenecimiento de trabajos" },
        { id: 4, serviceName: "Colocación de piercings y dilatadores" },
        { id: 5, serviceName: "Venta de piercings y otros artículos" },
    ];

    const todayFullTimeString = new Date()
        .toISOString()
        .slice(0, new Date().toISOString().lastIndexOf(":")); 
    
    return (
        <div>
            <input
                type="datetime-local"
                min={todayFullTimeString}
                value={newAppointment.Date}
                name="Date"
                onChange={inputHandler}
            />
            <CSelect
                category="Choose Service"
                options={services}
                handler={inputHandler}
            />
            <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={handleSendAppointment}
            >
                Send
            </button>
        </div>
    );
};