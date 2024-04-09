import {Link } from "react-router-dom";

export default function Dashboard() {

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex flex-col items-center mt-10 p-8 w-1/4 border-r-4 border-stone-500 rounded-xl">
                <Link className="border-b-4 px-10 py-2 my-2 hover:bg-neutral rounded-lg">Manage Collections</Link>
                <Link className="border-b-4 px-10 py-2 my-2 hover:bg-neutral rounded-lg">Manage Channels</Link>
                <Link className="border-b-4 px-10 py-2 my-2 hover:bg-neutral rounded-lg">Get Analysis</Link>
            </div>
            <div className="bg-secondary rounded">
                {/* <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                </Routes> */}
            </div>
        </div>
    );
}