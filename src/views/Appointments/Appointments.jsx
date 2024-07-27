import React, { useEffect, useState } from "react";
import { getAppointmentsUser } from "../../services/apiCalls";
import './Appointments.css';

export const Appointments = () => {
  const [myAppointments, setMyAppointments] = useState([]);
  const passport = JSON.parse(localStorage.getItem("passport"));

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const bringMyAppointments = async () => {
      try {
        const result = await getAppointmentsUser(passport.token);
        if (result.success && Array.isArray(result.data)) {
          setMyAppointments(result.data);
        } else {
          setMyAppointments([]);
        }
      } catch (error) {
        setMyAppointments([]);
      }
    };
    bringMyAppointments();
  }, [passport.token]);

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
              <th className="text-center">Service ID</th>
            </tr>
          </thead>
          <tbody>
            {myAppointments.length ? (
              myAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="text-center">{appointment.id}</td>
                  <td className="text-center">{formatDate(appointment.date)}</td>
                  <td className="text-center">{appointment.services.service_name}</td>
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
