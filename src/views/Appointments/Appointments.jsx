import { useEffect, useState } from "react";
import { CInput } from "../../components/CInput/CInput";
import { CSelect } from "../../components/CSelect/CSelect";

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    userId: "", // este viene del token
    serviceId: "", // el servicio lo elegiré de un desplegable
    date: "", // date lo sacaremos de un input type="date" (y opcionalmente input type="time")
  });

//   useEffect(() => {
//     // getMyAppointments(token)
//     console.log(newAppointment);
//   }, [newAppointment]);

  const inputHandler = (e) => {

    if (e.target.value === "Elige el servicio") {
        console.log("You cannot pass")
        return
    }
    console.log(e.target.value)
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    });
  };

  const services = [{id:1, serviceName: "tattoo"}, {id:2, serviceName: "patata"}]

  const todayFullTimeString = new Date()
    .toISOString()
    .slice(0, new Date().toISOString().lastIndexOf(":"));
  return (
    <div>
      <input
        type="datetime-local"
        min={todayFullTimeString}
        value={newAppointment.date}
        name="date"
        onChange={(e) => inputHandler(e)}
      />

      <CSelect
      category="Choose Service"
      options={services}
      handler={inputHandler}
      />
    </div>
  );
};