import React, { useEffect, useState } from 'react'
import { CInput } from '../../components/CInput/CInput'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../../services/apiCalls'

export const Profile = () => {
    const [profileData, setProfileData] = useState({ name: "", email: "", CreatedAt: "" })

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token;
    const navigate = useNavigate()

    useEffect(() => {
        if (!passport) {
            navigate("/login")
        } else {
            const bringMyProfile = async () =>{
                const response = await getUserProfile(passport.token)
                setProfileData(response.data)
                console.log(response)
            }
            bringMyProfile()
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("passport")
        navigate("/login")
    }

    return (
        <>
            <h1>Profile</h1>
            <h2>Bienvenido {profileData.email}</h2>
            <p>Name: {profileData.first_name}</p>
            <p>Email: {profileData.email}</p>
            <p>Created_at: {profileData.created_at}</p>
            <CInput type="button" name="logout" value="logout" onClick={logout} />
        </>
    )
}
