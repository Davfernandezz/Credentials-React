import React, { useEffect } from 'react'

export const Services = () => {
    useEffect(()=> {
        console.log('UseEffect')

        fetch('http://localhost:4000/api/services')
        .then(res =>{
            console.log(res);
        })
        .catch(e =>{
            console.log(e);
        })
    })

  return (
    <>
    <h1>Services</h1>
    </>
  )
}
