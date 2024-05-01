import { Routes, Route, Link } from "react-router-dom";
import ManageCollections from "./ManageCollections";
import { ChevronRight } from "lucide-react";
import ManageChannels from "./ManageChannels";

export default function Dashboard() {

    return (
        <div className="flex flex-col h-full lg:px-auto lg:py-auto gap-2 overflow-hidden">
            <h1 className="hidden lg:block text-3xl lg:px-20">Dashboard</h1>
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="flex m-2 justify-center items-center w-50 drawer-button lg:hidden gap-1"> <ChevronRight className="w-5 h-5 border-2 rounded-xl" /> Collections </label>
                        <div className="flex justify-center rounded w-full h-full">
                            <Routes>
                                <Route path="/manageCollections/*" element={<ManageCollections />} />
                                <Route path="/manageChannels/*" element={<ManageChannels />} />
                            </Routes>
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-3/5 sm:w-1/3 lg:w-80 h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <Link to="/app/dashboard/manageCollections" className="btn btn-ghost">Manage Collections</Link>
                            <Link to="/app/dashboard/manageChannels" className="btn btn-ghost">Manage Channels</Link>
                            <Link className="btn btn-ghost">Get Analysis</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}