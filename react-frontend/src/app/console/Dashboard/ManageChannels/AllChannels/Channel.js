import { CirclePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { dateExtractFromMySQLDateTime } from "../../../../../lib/useDate";

export default function Channel() {
    const { channelID } = useParams();
    const [channelDetails, setChannelDetails] = useState({
        channelName: 'WellerMan',
        ownerName: 'Sajid',
        ownerID: 'bf7cb2ed-07d4-11ef-a213-cc6b1ea18fbc',
        createdOn: "2024-05-13T15:46:00.000Z",
        groups: [],
        teachers: [],
        students: []
    });

    const getChannelDetails = async (channelID) => {
        try {
            const APIroot = process.env.REACT_APP_API_ROOT;
            const getChannelDetailsAPI = process.env.REACT_APP_GET_CHANNEL_DETAILS_API;
            // console.log(APIroot + getChannelDetailsAPI + `?channelID=${channelID}`);
            const response = await fetch(APIroot + getChannelDetailsAPI + `?channelID=${channelID}`, {
                method: "GET",
                credentials: "include"
            });
            if (!response.ok) {
                throw Error("Could not add channel");
            }
            const resp = await response.json();
            let chanDet = resp.channelDetails;
            // console.log(chanDet);
            chanDet.createdOn = dateExtractFromMySQLDateTime(chanDet.createdOn);
            setChannelDetails(chanDet);
        } catch (err) {
            console.error("Could not get channel Details");
        }
    };

    const addGroup = async() => {
        const groupName = document.getElementById("groupName").value;
        try{
            const APIroot = process.env.REACT_APP_API_ROOT;
            const addGroupAPI = process.env.REACT_APP_ADD_GROUP_API;
            // console.log(APIroot + getChannelDetailsAPI + `?channelID=${channelID}`);
            const response = await fetch(APIroot + addGroupAPI, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    channelID: channelID,
                    groupName: groupName
                })
            });
            if (!response.ok) {
                throw Error("Could not add group");
            }
            getChannelDetails(channelID);
            document.getElementById("newGroup").close()
        }catch(err){
            console.error("Error adding new group: ", err);
        }
    }


    useEffect(() => {
        getChannelDetails(channelID);
    }, [channelID]);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex h-1/5 w-full">
                <div className="w-1/3">
                    <img src='https://img.freepik.com/free-vector/gradient-black-background-with-cubes_23-2149177092.jpg?t=st=1715742364~exp=1715745964~hmac=100b8d4c19be451167db884d6071280cbf96f3d73dfca3eefc1402bae63f0772&w=996' alt="nein" />
                </div>
                <div className="flex flex-col gap-3 p-3 w-2/3">
                    <h1 className="text-2xl font-bold text-secondary">{channelDetails.channelName}</h1>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-sm"><span className="text-info">Owner: </span>{channelDetails.ownerName}</h2>
                        <h3 className="font-bold text-sm"><span className="text-accent">Created On: </span>{channelDetails.createdOn}</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-3/5 w-full overflow-hidden">
                <div className="flex flex-col p-2 mx-10 border-b-2 border-t-2">
                    <h1 className="text-primary font-bold">About:</h1>
                    <p>{channelDetails.about}</p>
                </div>
                <div className="flex h-3/4 p-3">
                    <div className="flex flex-col w-1/3 p-3 overflow-auto">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold p-2 text-secondary">Groups</h1>
                            <button className="btn btn-ghost btn-xs" onClick={() => document.getElementById("newGroup").showModal()}> <CirclePlus className="h-4 w-4" /> </button>
                        </div>
                        <dialog id="newGroup" className="modal">
                            <div className="modal-box bg-neutral gap-2">
                                <form method="dialog">
                                    <button className="flex btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X className="w-4 h-4" /></button>
                                </form>
                                <div className="card card-compact text-md font-normal">
                                    <div className="card-body">
                                        {/* <h1>Try Giving Meaningful Names for Better Search</h1> */}
                                        <div className="card-title text-sm">
                                            <label className="input w-full input-bordered flex items-center">
                                                <input type="text" className="grow md:input-md input-sm" placeholder="group Name" id="groupName" />
                                            </label>
                                            <button onClick={addGroup} className="btn btn-success btn-md w-20">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                        <ul className="flex flex-col bg-neutral h-full w-full p-3 gap-2">
                            {channelDetails.groups.map((group, key) => {
                                return (
                                    <Link key={key} className="rounded-lg p-3 bg-base-100">{group.groupName}</Link>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex flex-col w-2/3 p-3 bg-neutral">
                        <h1 className="font-bold p-2 text-accent">Members</h1>
                        <ul className="flex flex-col gap-2 bg-base-100 h-full w-full p-3">
                            {channelDetails.teachers.map((teacher, key) => {
                                return (
                                    <Link key={key} className="p-3 rounded-lg bg-neutral">{teacher.teachername}</Link>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex h-1/5 w-full">

            </div>
        </div>
    )
}