import { useForm } from "react-hook-form";
import { KeyRound, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../lib/AuthProvider";
import { useContext } from "react";
import { AppContext } from "../../lib/AppControlProvider";

export default function Login() {
    const { register, handleSubmit } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { setLoginStateTrue } = useContext(AuthContext);
    const { setPageStateTo } = useContext(AppContext);

    async function loginUser(data) {
        const user = {
            username: data.username,
            password: data.password
        };
        const isLoggedIn = await login(user);
        if(isLoggedIn) {
            setLoginStateTrue();
            setPageStateTo({app: "app", page: "dashboard"});
            navigate("/app/dashboard");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10 mt-20">
            <div className="flex flex-col items-center gap-1">
                <h1 className="md:text-2xl font-bold">
                    Log in to an Existing Account
                </h1>
                <div className="flex">
                    <span>Or</span>&nbsp;<span><ul><li><Link to="/auth/register" className="flex text-emerald-400 font-bold">Register</Link></li></ul></span>&nbsp;<span>a new account</span>
                </div>
            </div>
            <form onSubmit={handleSubmit(loginUser)} className="flex flex-col items-center gap-3">
                <label className="input input-bordered flex items-center">
                    <User className="w-4 h-4"/>
                    <input {...register("username")} type="text" className="grow md:input-lg input-sm" placeholder="Username" />
                </label>
                <label className="input input-bordered flex items-center">
                    <KeyRound className="w-4 h-4"/>
                    <input {...register("password")} type="password" className="grow md:input-lg input-sm" placeholder="password" autoComplete="off"/>
                </label>

                <button className="btn btn-primary md:btn-md btn-sm w-full" type="submit">Log in</button>
            </form>
        </div>
    )
}
