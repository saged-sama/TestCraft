import { CirclePlus, Dot, Search, X } from "lucide-react";
import { useState } from "react";

export default function AllChannels() {
    const [channels, setChannels] = useState([]);
    const [channelAdded, setChannelAdded] = useState(false);

    const addChannel = async() => {

    }

    return (
        <div className="flex flex-col h-full overscroll-y-contain gap-2">
            {/* Header */}
            <div className="hidden border-b-2 lg:flex">
                <h1 className="text-xl">Channels</h1>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <button className="btn btn-neutral btn-ghost btn-sm" onClick={() => document.getElementById("newchannel").showModal()}>
                    <span className="flex items-center gap-1"><CirclePlus className="w-4 h-4 text-primary" /> Create New Channel</span>
                </button>

                <label className="hidden input input-bordered md:w-1/2 md:flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search channels..." />
                    <Search />
                </label>
            </div>

            <dialog id="newchannel" className="modal">
                <div className="modal-box bg-neutral gap-2">
                    <form method="dialog">
                        <button className="flex btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X className="w-4 h-4" /></button>
                    </form>
                    <div className="card card-compact text-md font-normal">
                        <div className="card-body">
                            <h1>Try Giving Meaningful Names for Better Search</h1>
                            <div className="card-title text-sm">
                                <label className="input w-full input-bordered flex items-center">
                                    <input type="text" className="grow md:input-md input-sm" placeholder="channel Name" id="channelName" />
                                </label>
                                <button onClick={addChannel} className="btn btn-success btn-md w-20">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>

            <div className="flex flex-col items-center h-screen w-full overflow-y-scroll">
                {channels.map(channel => {
                    return (
                        <div key={channel.channelID} className="card card-compact text-md font-normal w-3/4 m-2 bg-neutral shadow-xl">
                            <div className="card-body">
                                <div className="card-title text-sm justify-between">
                                    <div className="flex ">
                                        <h1 title="channel Name" className="font-bold">{channel.channelName}</h1>
                                        <Dot />
                                        <p title="channel Owner" className="text-info font-medium">{channel.ownerName}</p>
                                    </div>
                                    <div className="hidden md:block text-xs">
                                        <span className="text-orange-400">Created on:</span> <span>{channel.createdOn}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="stats shadow">

                                        <div className="stat">
                                            <div className="stat-figure text-accent">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                            </div>
                                            <div className="stat-title">Total problems</div>
                                            <div className="stat-value text-accent">25.6K</div>
                                            <div className="stat-desc">21% more than last month</div>
                                        </div>

                                        <div className="stat">
                                            <div className="stat-figure text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                            </div>
                                            <div className="stat-title">Problem usage</div>
                                            <div className="stat-value text-secondary">2.6M</div>
                                            <div className="stat-desc">21% more than last month</div>
                                        </div>

                                        <div className="stat">
                                            <div className="stat-figure text-info">
                                                <div className="avatar">
                                                    <div className="w-16 rounded-full">
                                                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="kk"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stat-value">86</div>
                                            <div className="stat-title">People involved</div>
                                            <div className="stat-desc text-info">31 tasks remaining</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}