import React from 'react'

export const Profile = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))

    const token = passport.token
    // const email = passport.tokenData.email

  return (
    <>
        <h1>Profile</h1>
        <p>Name: </p>
        <p>Active: </p>
        <p>Created_at: </p>
    </>
  )
}
