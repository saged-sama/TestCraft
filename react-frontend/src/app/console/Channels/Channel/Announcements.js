import React, { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Search, CirclePlus } from "lucide-react";
import { useParams } from 'react-router-dom';
import {useCookies} from "react-cookie";
import { dateExtractFromMySQLDateTime } from '../../../../lib/useDate';

export default function Announcements() {
    const [cookies] = useCookies(["userID", "authToken"]);
    const { channelID, groupID } = useParams();
    const [announcements, setAnnouncements] = useState([    
        {
            announcementID: 1,
            title: "Important Update",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida ligula eu ipsum vehicula, quis feugiat nibh fermentum."
        },
        {
            announcementID: 2,
            title: "Reminder: Deadline Approaching",
            description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ac ligula sit amet nisi tincidunt dignissim."
        },
        {
            announcementID: 3,
            title: "Event Announcement",
            description: "Integer ac tristique justo. Nulla facilisi. Morbi vehicula nisi vitae felis mattis, vel rhoncus turpis lacinia."
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '' });

    const addAnnouncement = async() => {
        const title = newAnnouncement.title;
        const description = newAnnouncement.description;
        try {
            const APIRoot = process.env.REACT_APP_API_ROOT;
            // console.log(APIRoot);
            const addAnnouncementAPI = process.env.REACT_APP_ADD_ANNOUNCEMENT_API;
            const response = await fetch(APIRoot + addAnnouncementAPI, {
                method: 'POST',
                // credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userID: cookies.userID,
                    authToken: cookies.authToken,
                    channelID: channelID,
                    groupID: groupID,
                    title: title,
                    isTest: "false",
                    description: description
                })
            });
            if (!response.ok) {
                console.error("Could not add collection");
            }
            // const resp = await response.json();
            getAnnouncements(channelID, groupID);
            // setGroups(resp.groups);
        } catch (err) {
            console.error("Couldn't add collection: ", err);
        }
    };

    const getAnnouncements = async(channelID, groupID) => {
        try {
            const APIRoot = process.env.REACT_APP_API_ROOT;
            // console.log(APIRoot);
            const getAnnouncementsAPI = process.env.REACT_APP_GET_ANNOUNCEMENT_API;
            const response = await fetch(APIRoot + getAnnouncementsAPI + `?channelID=${channelID}&groupID=${groupID}&isTest=false`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                console.error("Could not add collection");
            }
            const resp = await response.json();
            setAnnouncements(resp.announcements);
            // console.log(resp.announcements);
            // setGroups(resp.groups);
        } catch (err) {
            console.error("Couldn't add collection: ", err);
        }
    };

    const searchAnnouncement = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        getAnnouncements(channelID, groupID);
    }, [channelID, groupID]);

    return (
        <div className='m-2 p-2 w-full h-screen'>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <button className="btn btn-neutral btn-ghost btn-sm" onClick={() => document.getElementById("newAnnouncement").showModal()}>
                    <span className="flex items-center gap-1"><CirclePlus className="w-4 h-4 text-primary" /> Add an Announcement</span>
                </button>

                <label className="hidden input input-bordered  md:flex items-center gap-2">
                    <input id="searchAnnouncement" type="text" className="grow" placeholder="Search Announcement..." onChange={searchAnnouncement} />
                    <Search />
                </label>
            </div>

            <dialog id="newAnnouncement" className="modal">
                <div className="modal-box bg-neutral gap-2">
                    <form method="dialog">
                        <button className="flex btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><X className="w-4 h-4" /></button>
                    </form>
                    <div className="card card-compact text-md font-normal">
                        <div className="card-body flex flex-col">
                            <h1>Add an Announcement</h1>
                            <div className="card-title text-sm">
                                <label className="input w-full input-bordered flex items-center">
                                    <input type="text" className="grow md:input-md input-sm" placeholder="Announcement Title" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} />
                                </label>
                            </div>
                            <textarea placeholder="Add Details" className="textarea textarea-bordered textarea-lg w-full" value={newAnnouncement.description} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}></textarea>
                            <button onClick={addAnnouncement} className="btn btn-success btn-md w-20">Add</button>
                        </div>
                    </div>
                </div>
            </dialog>

            {filteredAnnouncements.map((announcement) => (
                <div key={announcement.announcementID} className="flex flex-col gap-5 m-2 w-1/2 p-6 bg-base-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className='flex flex-col gap-1'>
                        <h5 className="mb-2 text-xl text-accent font-bold tracking-tight">{announcement.title}</h5>
                        <h1 className='flex gap-1 text-sm'><p className='text-info'>{announcement.poster}</p> | {dateExtractFromMySQLDateTime(announcement.createdOn)}</h1>
                    </div>
                    <div className="bg-neutral p-4 rounded-lg font-normal">{announcement.description}</div>
                </div>
            ))}
        </div>
    );
}