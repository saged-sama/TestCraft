import { Link } from "react-router-dom";
import {BookOpen, Pyramid} from "lucide-react";
import Logo from "../../assets/test-svgrepo-com.svg";

export default function HomeNavbar() {
    return (
        <nav className="relative border-b-4 rounded-3xl md:border-0 container mx-auto p-2 md:p-6">
            <div className="flex items-center justify-between">
                <Link to="/" className='pt-2 flex hover:bg-neutral p-2 rounded-lg gap-1'>
                    <img src={Logo} alt="logo" className="md:w-11 md:h-11 w-8 h-8" />
                    <h1 className="md:text-3xl text-2xl font-bold">TestCraft</h1>
                </Link>
                <div className="hidden md:flex space-x-6 gap-2">
                    <label className='hover:text-primary'>
                        <Link to="/documentation" className='flex items-center justify-center content-center gap-2'>
                            <BookOpen className="w-4 h-4"/>
                            <p>Docs</p>
                        </Link>
                    </label>
                    <label className='hover:text-primary'>
                        <Link to="/guide" className='flex items-center justify-center content-center gap-2'>
                            <Pyramid className="w-4 h-4"/>
                            <p>Guide</p>
                        </Link>
                    </label>
                </div>
                <Link to="/auth/register" className='hidden md:btn btn-md btn-primary'>Get Started</Link>
                <div className="md:hidden dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-primary btn-sm rounded-l-btn"> Get Started </div>
                    <ul tabIndex={0} className="menu border dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box mt-4">
                        <li><Link to="/auth/register">Register</Link></li>
                        <li><Link to='/documentation'>Documentation</Link></li>
                        <li><Link to='/guide'>Guide</Link></li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}