import { CirclePlus, Dot, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { dateExtractFromMySQLDateTime } from "../../../../../lib/useDate";
import { Link, Route, Routes } from "react-router-dom";
import Channel from "./Channel";

export default function AllChannels() {
    const [channels, setChannels] = useState([]);
    const [channelAdded, setChannelAdded] = useState(false);

    const addChannel = async () => {
        const channelName = document.getElementById("channelName").value;
        try {
            const APIroot = process.env.REACT_APP_API_ROOT;
            const addChannelAPI = process.env.REACT_APP_ADD_CHANNEL_API;
            const response = await fetch(APIroot + addChannelAPI, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    channelName
                })
            });
            if (!response.ok) {
                throw Error("Could not add channel");
            }
            setChannelAdded(true);
        } catch (err) {
            console.error("Could not add channel");
        }
    };

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const APIroot = process.env.REACT_APP_API_ROOT;
                const fetchChannelsAPI = process.env.REACT_APP_GET_CHANNELS;
                const response = await fetch(APIroot + fetchChannelsAPI, {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) {
                    throw Error("Could not fetch channels");
                }
                const resp = await response.json();
                let chans = resp.channels;
                chans.forEach(channel => {
                    channel.createdOn = dateExtractFromMySQLDateTime(channel.createdOn);
                });
                setChannels(chans);
                setChannelAdded(false);
            } catch (err) {
                console.error("Could not fetch channels");
            }
        };
        fetchChannels();
    }, [channelAdded, setChannelAdded]);

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

            <div className="flex w-full h-screen">
                <div className="flex flex-col items-center h-full w-1/2 overflow-y-auto">
                    {channels.map(channel => {
                        return (
                            <Link to={`/app/dashboard/manageChannels/${channel.channelID}`} key={channel.channelID} className="card card-compact text-md font-normal w-3/4 m-2 bg-neutral shadow-xl">
                                <div className="card-body">
                                    <div className="card-title text-sm justify-between">
                                        <div className="flex ">
                                            <h1 title="channel Name" className="font-bold">{channel.channelName}</h1>
                                            <Dot />
                                            <p title="channel Owner" className="text-info font-medium">{channel.ownerName}</p>
                                        </div>
                                        <div className="hidden md:block text-xs">
                                            <span className="text-accent">Created on:</span> <span>{channel.createdOn}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex flex-col items-center h-full w-1/2">
                    <Routes>
                        <Route path="/:channelID" element={<Channel />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}