const URL = 'http://localhost:4000/api'

export const registerUser = async (credentials) => {
    try {
        const request = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const result = await request.json();
        return result;
    } catch (error) {
        console.error("User register error:", error);
        throw error;
    }
}


export const loginUser = async (credentials) => {
    try {
        const request = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const result = await request.json();
        return result;
    } catch (error) {
        console.error("User logging error:", error);
        throw error;
    }
}

export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${URL}/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json()
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const updateProfile = async (changes, token) => {
    try {
        const response = await fetch(`${URL}/profile/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(changes),
        });
        return await response.json()
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const getUsers = async (token) => {
    try {
        const response = await fetch(`${URL}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json()
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const deleteUserById = async (token, id) => {
    try {
        const response = await fetch(`${URL}/users/${+id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        return await response.json()
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export const createAppointments = async (data, token) => {
    data.service_id = parseInt(data.service_id);
    const response = await fetch(`${URL}/appointments/create`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    return await response.json();
  };

export const getAppointmentsUser = async (token) => {
    try {
        const response = await fetch(`${URL}/appointments/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};

export const deleteAppointmentsUser = async (token, id) => {
    try {
        const response = await fetch(`${URL}/appointments/${+id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting appointments:", error);
        throw error;
    }
}