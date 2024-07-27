import React, { useEffect, useState } from "react";
import { deleteAppointmentsUser, getAppointmentsUser, createAppointments } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import './Appointments.css';

export const Appointments = () => {
    const [myAppointments, setMyAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        date: "",
        service_id: "",
    });
    const passport = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();

    const todayString = new Date().toISOString().split("T")[0];

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const inputHandler = (e) => {
        setNewAppointment({
            ...newAppointment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSendAppointment = async () => {
        try {
            const response = await createAppointments(newAppointment, passport.token);
            if (response.success) {
                setMyAppointments([...myAppointments, response.data]);
                setNewAppointment({
                    date: "",
                    service_id: "",
                });
            }
        } catch (error) {
            console.log(error);
        }
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
            alert(response.message);
        }
    };

    return (
        <div className="appointments-container container mt-4">
          <div className="create-appointment card p-4 mb-4">
            <h2 className="text-center mb-4">New Appointment</h2>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                min={todayString}
                value={newAppointment.date}
                name="date"
                onChange={(e) => inputHandler(e)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="service_id">Service:</label>
              <select
                id="service_id"
                name="service_id"
                value={newAppointment.service_id}
                onChange={(e) => inputHandler(e)}
                className="form-control"
              >
                <option value="" disabled hidden>
                  Select a service...
                </option>
                <option value={1}>Tatuaje Personalizado</option>
                <option value={2}>Tatuaje del Catálogo</option>
                <option value={3}>Restauración y Rejuvenecimiento</option>
                <option value={4}>Colocación de Piercings y dilatadores</option>
                <option value={5}>Venta de piercings y otros artículos</option>
              </select>
            </div>
            <button
              onClick={handleSendAppointment}
              className="btn btn-success btn-block mt-3"
            >
              Create Appointment
            </button>
          </div>
    
          <div className="card p-4">
            <h2 className="text-center mb-4">My Appointments</h2>
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
                        <td className="text-center">
                          <button
                            type="button"
                            name={appointment.id}
                            className="btn btn-danger btn-sm"
                            onClick={deleteAppointmentHandler}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        You have no appointments yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };
    