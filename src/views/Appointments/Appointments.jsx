import React, { useEffect, useState } from "react";
import { deleteAppointmentsUser, getAppointmentsUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import './Appointments.css';

export const Appointments = () => {
    const [myAppointments, setMyAppointments] = useState([]);
    const passport = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    useEffect(() => {
        if (!passport) {
            navigate("/login");
            return;
        }
        const bringMyAppointments = async () => {
            try {
                const response = await getAppointmentsUser(passport.token);
                if (response.success && Array.isArray(response.data)) {
                    setMyAppointments(response.data);
                } else {
                    setMyAppointments([]);
                }
            } catch (error) {
                setMyAppointments([]);
            }
        };
        bringMyAppointments();
    }, [passport, navigate]);

    const deleteAppointmentHandler = async (e) => {
        const id = +e.target.name;
        const response = await deleteAppointmentsUser(passport.token, id);
        if (response.success) {
            const remainingAppointments = myAppointments.filter((appointment) => appointment.id !== id);
            setMyAppointments(remainingAppointments);
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="appointments-container container mt-4">
            <div className="card">
                <h1 className="text-center mt-3 mb-3">My Appointments</h1>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Service</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myAppointments.length ? (
                            myAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td className="text-center">{appointment.id}</td>
                                    <td className="text-center">{formatDate(appointment.date)}</td>
                                    <td className="text-center">{appointment.services.service_name}</td>
                                    <td>
                                        <button type="button" name={appointment.id} className="btn btn-danger btn-sm" onClick={deleteAppointmentHandler}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    You have no appointments yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
