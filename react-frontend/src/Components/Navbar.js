import Logo from '../assets/test-svgrepo-com.svg';
import { Link } from "react-router-dom";
import { Compass, Tv, Bell, Settings, Menu } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="relative container mx-auto md:p-6">
            <div className="flex items-center justify-between">
                <Link to="/app/dashboard" className='pt-2 flex hover:bg-neutral p-2 rounded-lg gap-1'>
                    <img src={Logo} alt="logo" className="md:w-11 md:h-11 w-8 h-8" />
                    <h1 className="md:text-3xl text-2xl font-bold">TestCraft</h1>
                </Link>
                <div className="hidden md:flex space-x-6 gap-2">
                    <label className='hover:text-primary'>
                        <Link to="/app/channels" className='flex items-center justify-center content-center gap-2'>
                            <Tv className='w-4 h-4'/>
                            <p>Channels</p>
                        </Link>
                    </label>
                    <label className='hover:text-primary'>
                        <Link to="/app/explore" className='flex items-center justify-center gap-2'>
                            <Compass className='w-4 h-4'/>
                            <p>Explore</p>
                        </Link>
                    </label>
                </div>
                <div className='hidden md:flex'>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"> <Bell className='w-5 h-5' /> </div>
                        <ul tabIndex={0} className="menu border dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box md:w-40 mt-4">
                            <li><Link to='/'>Your Profile</Link></li>
                            <li><Link to='/'>Item 2</Link></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"> <Settings className='w-5 h-5' /> </div>
                        <ul tabIndex={0} className="menu border dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box md:w-40 mt-4">
                            <li><Link to='/app/console'>Your Profile</Link></li>
                            <li><Link to='/app/console'>Dashboard</Link></li>
                            <li><div to='/'>Log Out</div></li>
                        </ul>
                    </div>
                </div>
                <div className="md:hidden dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"> <Menu /> </div>
                    <ul tabIndex={0} className="menu border dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box mt-4">
                        <li><Link to='/app/console'>Your Profile</Link></li>
                        <li><Link to='/app/console'>Dashboard</Link></li>
                        <li><Link to='/app/console'>Channels</Link></li>
                        <li><Link to='/app/console'>Explore</Link></li>
                        <li><Link to='/app/console'>Notifications</Link></li>
                        <li><div to='/'>Log Out</div></li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}