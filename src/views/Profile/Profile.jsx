import React, { useEffect, useState } from 'react'
import { CInput } from '../../components/CInput/CInput'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, updateProfile } from '../../services/apiCalls'
import "./Profile.css"

export const Profile = () => {
    const [profileData, setProfileData] = useState({ name: "", email: "", CreatedAt: "" })
    const [editData, setEditData] = useState({
        name: "",
        email: ""
    })
    const [editting, setEditing] = useState(false)
    const passport = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

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
        } else {
            const bringMyProfile = async () => {
                try {
                    const response = await getUserProfile(passport.token);
                    if (response.success) {
                        setProfileData(response.data);
                    } else {
                        navigate("/login");
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            bringMyProfile();
        }
    }, [navigate, passport]);

    const editButtonHandler = () => {
        setEditData({
            name: profileData.name,
            email: profileData.email
        })
        setEditing(!editting)
    }

    useEffect(() => {
    }, [profileData])
    const editInputHandler = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    const confirmButtonHandler = async () => {
        const token = passport.token;
        const response = await updateProfile(editData, token)
        if (response.success) {
            const newData = await getUserProfile(token)
            setProfileData(newData.data)
            setEditing(!editting)
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Profile</h1>
                            <h2 className="text-center">Welcome {profileData.email}</h2>
                            <div className={`form-group ${editting ? "" : "d-none"}`}>
                                <CInput
                                    type="text"
                                    name="first_name"
                                    placeholder="Name"
                                    className="form-control"
                                    emitFunction={editInputHandler}
                                />
                            </div>
                            <p className={`form-group ${editting ? "d-none" : ""}`}>
                                <br></br>
                                Name: {profileData.first_name || "Not available"}
                            </p>
                            <div className={`form-group ${editting ? "" : "d-none"}`}>
                                <CInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    emitFunction={editInputHandler}
                                />
                            </div>
                            <p className={`form-group ${editting ? "d-none" : ""}`}>
                                Email: {profileData.email}
                            </p>
                            <p className="form-group">
                                Created_at: {formatDate(profileData.created_at)}
                            </p>
                            <div className="text-center">
                                <CInput
                                    type="button"
                                    name="edit"
                                    value={!editting ? "Edit" : "Cancel"}
                                    className="btn btn-danger"
                                    emitOnClickButton={editButtonHandler}
                                />
                                <CInput
                                    type="button"
                                    name="save"
                                    value="Save changes"
                                    className={`btn btn-success mx-2 ${!editting ? "d-none" : ""}`}
                                    emitOnClickButton={confirmButtonHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

