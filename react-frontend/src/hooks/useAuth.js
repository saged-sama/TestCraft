import Cookies from 'js-cookie';

export default function useAuth () {

    const login = async (user) => {
        try {
            const APIRoot = process.env.REACT_APP_API_ROOT;
            const loginAPI = process.env.REACT_APP_LOGIN_API;
            const response = await fetch(APIRoot + loginAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if(!response.ok){
                return false;
            }
            else{
                const resp = await response.json();
                Cookies.set('userID', resp.userID);
                Cookies.set('authToken', resp.authToken);
                return true;
            }
        } catch(err){
            console.error("Login failed");
            return false;
        }
    };

    const signup = async (user) => {
        try{
            console.log()
            const response = await fetch(process.env.REACT_APP_SIGNUP_API, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if(!response.ok){
                console.error("Signup failed");
                return false;
            }
            return true;
        } catch(err){
            console.error("Signup failed");
            return false;
        }
    }

    const logout = () => {
        Cookies.remove('userid');
        Cookies.remove('authToken');
    };

    const logoutOfAllDevices = async () => {
        try{
            const response = await fetch(process.env.REACT_APP_LOGOUT_OF_ALL_DEVICES, {
                method: "GET",
                credentials: "include"
            });

            if(!response.ok){
                console.error("Error logging out of all devices");
                return false;
            }
            const resp = await response.json();
            if(!resp.success){
                console.error("Error logging out of all devices");
                return false;
            }
            Cookies.remove("userid");
            Cookies.remove("authToken");
            return true;
        } catch(err){
            console.error("Error logging out of all devices");
            return false;
        }
    }

    const isUserNameAvailable = async (username) => {
        try{
            const response = await fetch(process.env.REACT_APP_USERNAME_CHECK_AVAILABILITY_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: username
                })
            });
            if(!response.ok){
                return false;
            }
            const resp = await response.json();
            return resp.cnt === 0;
        } catch(err){
            console.error("Error fetching username availability");
            return false;
        }
    }

    return { login, signup, logout, logoutOfAllDevices, isUserNameAvailable };
};