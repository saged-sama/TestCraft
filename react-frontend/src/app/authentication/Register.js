import { KeyRound, Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Register(){
    const { register, handleSubmit } = useForm();
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function signupUser(data){
        const user = {
            username: data.username,
            password: data.password,
            email: data.email,
            phone: data.phone
        };
        console.table(user);
        const isSignedUp = await signup(user);
        if(isSignedUp){
            navigate("/auth/login");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10 mt-20">
            <div className="flex flex-col items-center gap-1">
                <h1 className="md:text-2xl font-bold">
                    Register a New Account
                </h1>
                <div className="flex">
                    <span>Or</span>&nbsp;<span><ul><li><Link to="/auth/login" className="flex text-green-400 font-bold">Log in</Link></li></ul></span>&nbsp;<span>to existing account</span>
                </div>
            </div>
            <form onSubmit={handleSubmit(signupUser)} className="flex flex-col items-center gap-3">
                <label className="input input-bordered flex items-center">
                    <Mail className="w-4 h-4"/>
                    <input {...register("email")} type="text" className="grow md:input-lg input-sm" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center">
                    <Phone className="w-4 h-4"/>
                    <input {...register("phone")} type="text" className="grow md:input-lg input-sm" placeholder="Phone" />
                </label>
                <label className="input input-bordered flex items-center">
                    <User className="w-4 h-4"/>
                    <input {...register("username")} type="text" className="grow md:input-lg input-sm" placeholder="Username" />
                </label>
                <label className="input input-bordered flex items-center">
                    <KeyRound className="w-4 h-4"/>
                    <input {...register("password")} type="password" className="grow md:input-lg input-sm" placeholder="Password" autoComplete="off"/>
                </label>
                <button className="btn btn-secondary md:btn-md btn-sm w-full" type="submit">Sign up</button>
            </form>
            
        </div>
    )
}
