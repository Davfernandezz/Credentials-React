import React, { useEffect, useState } from 'react'

export const Services = () => {

  const [services, setServices] = useState([])

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
    <>
      <h1>Services</h1>
      {
        services.map((service) => (
          <div key={service.id} className='card'>
          <h3>{service.service_name}</h3>
          <p>{service.description}</p>
          </div>
        )
        )
      }
    </>
  )
}
