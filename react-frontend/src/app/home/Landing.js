import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";

export default function Landing() {
    return (
        <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto space-y-0 mt-10 md:gap-5">
            <div className="flex flex-col mb-32 space-y-5 md:w-1/2 p-2">
                <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left md:pt-40">
                    Create, Give, and Take Tests to your Convenience
                </h1>
                <p className="max-w-sm text-center text-gray md:text-left">
                    TestCraft offers a platform for creating and giving tests. It also comes along with advanced features like test assessment and analysis with AI assistance
                </p>
                <div className="flex justify-center md:justify-start gap-2">
                    <Link to="/auth/register" className='btn btn-md btn-primary'>Get Started</Link>
                    <Link to="/auth/login" className="btn btn-md btn-neutral gap-0">Sign in<MoveRight className="w-4 h-4" /> </Link>
                </div>
            </div>
            <div className="flex md:w-1/2 items-center justify-center">
                {/* <img src={logo} alt="Logo"/> */}
            </div>
        </div>
    );
}