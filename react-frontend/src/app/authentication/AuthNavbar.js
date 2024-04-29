import { Link } from "react-router-dom";
import Logo from "../../assets/test-svgrepo-com.svg";

export default function AuthNavbar(){
    return (
        <nav className="relative container mx-auto p-2 md:p-6">
            <div className="flex items-center justify-between">
                <Link to="/" className='pt-2 flex hover:bg-neutral p-2 rounded-lg gap-1'>
                    <img src={Logo} alt="logo" className="md:w-11 md:h-11 w-8 h-8" />
                    <h1 className="md:text-3xl text-2xl font-bold">TestCraft</h1>
                </Link>
            </div>
        </nav >
    );
}