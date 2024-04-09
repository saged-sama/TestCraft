import Cookies from 'js-cookie';

export default function useAuth () {

    const login = async (user) => {
        try {
            const response = await fetch(process.env.REACT_APP_LOGIN_API, {
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
            console.error("Login failed: ", err);
            return false;
        }
    };

    const signup = async (user) => {
        try{
            const response = await fetch(process.env.REACT_APP_SIGNUP_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if(!response.ok){
                console.log("Not ok!!");
                return false;
            }
            return true;
        } catch(err){
            console.error("Signup failed: ", err);
            return false;
        }
    }

    const logout = () => {
        Cookies.remove('userid');
        Cookies.remove('authToken');
    };

    return { login, signup, logout };
};