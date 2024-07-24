import React, { useEffect, useState } from 'react'
import { CInput } from '../../components/CInput/CInput'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, updateProfile } from '../../services/apiCalls'
import "./Profile.css"

export const Profile = () => {
    const [profileData, setProfileData] = useState({ name: "", email: "", CreatedAt: "" })
    const [editData, sedEditData] = useState({
        name: "",
        email: ""
    })
    const [editting, sedEditing] = useState(false)
    const passport = JSON.parse(localStorage.getItem("passport"))
    const token = passport.token
    const navigate = useNavigate()

    useEffect(() => {
        if (!passport) {
            navigate("/login")
        } else {
            const bringMyProfile = async () => {
                const response = await getUserProfile(passport.token)
                setProfileData(response.data)
                console.log(response)
            }
            bringMyProfile()
        }
    }, [])

    const editButtonHandler = () => {
        sedEditData({
            name: profileData.name,
            email: profileData.email
        })
        sedEditing(!editting)
    }

    useEffect(() => {
        console.log("estamos editando", profileData)
    }, [profileData])

    const editInputHandler = (e) => {
        sedEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    const confirmButtonHandler = async () => {
        const response = await updateProfile(editData, token)
        console.log(response)
    }

    const logout = () => {
        localStorage.removeItem("passport")
        navigate("/login")
    }

    return (
        <>
            <h1>Profile</h1>
            <h2>Welcome {profileData.email}</h2>
            <p className={editting ? "hidden" : ""}>Name: {profileData.first_name ? profileData.first_name : "Not available"}</p>
            <CInput type="text" name="first_name" placeholder="name" className={editting ? "" : "hidden"} emitFunction={editInputHandler} />
            <p className={editting ? "hidden" : ""}>Email: {profileData.email}</p>
            <CInput type="email" name="email" placeholder={editData.email} className={editting ? "" : "hidden"} emitFunction={editInputHandler} />
            <p>Created_at: {profileData.created_at}</p>
            <CInput type="button" name="edit" value={!editting ? "edit" : "cancel"} emitOnClickButton={editButtonHandler} />
            <CInput type="button" name="edit" value="Save changes" className={!editting ? "hidden" : ""} emitOnClickButton={confirmButtonHandler}
            />
        </>
    )
}
