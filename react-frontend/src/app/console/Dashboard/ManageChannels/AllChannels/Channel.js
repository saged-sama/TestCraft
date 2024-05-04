import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function Channel() {
    const { channelID } = useParams();
    const [channelDetails, setChannelDetails] = useState({
        channelID: channelID,
        channelName: "Udvash",
        about: "The Channel for all ",
        ownerName: "Myself",
        createdOn: "Fri, May 3, 2024 at 1:16",
        totalAnnouncements: 14,
        totalGroups: 5,
        groups: [
            "Stupid Group",
            "Idiotic Group",
            "Morich Group"
        ],
        channelTeachers: [
            "Rahim",
            "Karim",
            "Jodu",
            "Modu"
        ],
        channelStudents: [
            "Rahim",
            "Karim",
            "Jodu",
            "Modu"
        ],
    });


    // useEffect(() => {
    //     const getChannelDetails = async () => {
    //         const chanDet = {
    //             channelID: channelID,
    //             channelName: "Udvash",
    //             about: "The Channel for all ",
    //             ownerName: "Myself",
    //             createdOn: "Fri, May 3, 2024 at 1:16",
    //             totalAnnouncements: 14,
    //             totalGroups: 5,
    //             groups: [
    //                 "Stupid Group",
    //                 "Idiotic Group",
    //                 "Morich Group"
    //             ],
    //             channelTeachers: [
    //                 "Rahim",
    //                 "Karim",
    //                 "Jodu",
    //                 "Modu"
    //             ],
    //             channelStudents: [
    //                 "Rahim",
    //                 "Karim",
    //                 "Jodu",
    //                 "Modu"
    //             ],
    //         };
    //         setChannelDetails(chanDet);
    //     };
    //     getChannelDetails();
    // }, [channelID]);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex h-1/5 w-full">
                <div className="w-1/3 bg-yellow-300">

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
                            <button className="btn btn-ghost btn-xs"> <CirclePlus className="h-4 w-4"/> </button>
                        </div>
                        <ul className="flex flex-col bg-neutral h-full w-full p-3 gap-2">
                            {channelDetails.groups.map((group, key) => {
                                return (
                                    <li key={key} className="btn btn-ghost bg-base-100">{group}</li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex flex-col w-2/3 p-3 bg-neutral">
                        <h1 className="font-bold p-2 text-accent">Members</h1>
                        <ul className="flex flex-col gap-2 bg-base-100 h-full w-full p-3">
                            {channelDetails.channelTeachers.map((teacher, key) => {
                                return (
                                    <li key={key} className="btn btn-neutral">{teacher}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex h-1/5 w-full bg-green-400">

            </div>
        </div>
    )
}