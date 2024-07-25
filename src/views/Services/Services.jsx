import React, { useEffect, useState } from 'react'
import { CCard } from '../../components/CCard/CCard'
import "./Services.css"

export const Services = () => {

  const [services, setServices] = useState([])

  const passport = JSON.parse(localStorage.getItem("passport"))

  useEffect(() => {
    console.log('UseEffect')

    fetch('http://localhost:4000/api/services')
      .then(res => {
        return res.json();
      })
      .then(res => {
        setServices(res.data)
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      })
  }, [])

  return (
    <div className="container">
    <div className="card">
      <h1 className="text-center">Services</h1>
    </div>
    <div className="row">
      {services.map((service) => (
        <div key={service.id} className="col-md-4 mb-4">
          <CCard name={service.service_name} description={service.description} />
        </div>
      ))}
    </div>
  </div>
);
};
