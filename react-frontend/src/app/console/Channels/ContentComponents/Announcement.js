import React from 'react';
import { ArrowRight , X} from 'lucide-react';
import { Search, CirclePlus } from "lucide-react";

const Announcement = () => {
    const announcements = [
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
    ];
    async function addAnnouncement() {
        try {

        } catch (err) {
            console.error("Couldn't add collection: ", err);
        }
    }

    const searchAnnouncement = async () => {
        try {

        } catch (err) {
            console.error("Couldn't add collection: ", err);
        }
    }

    return (
        <div className='m-2 p-2 h-full'>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <button className="btn btn-neutral btn-ghost btn-sm" onClick={() => document.getElementById("newAnnouncement").showModal()}>
                    <span className="flex items-center gap-1"><CirclePlus className="w-4 h-4 text-primary" /> Create New Announcement</span>
                </button>

                <label className="hidden input input-bordered md:w-1/2 md:flex items-center gap-2">
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
                            <h1>Announcement</h1>
                            <div className="card-title text-sm">
                                <label className="input w-full input-bordered flex items-center">
                                    <input type="text" className="grow md:input-md input-sm" placeholder="Announement Name" id="announcementName" />
                                </label>
                            </div>
                            <textarea placeholder="Add Details" class="textarea textarea-bordered textarea-lg w-full" ></textarea>
                            <button onClick={addAnnouncement} className="btn btn-success btn-md w-20">Add</button>
                        </div>
                    </div>
                </div>
            </dialog>

            {announcements.map((announcement) => (
                <div key={announcement.announcementID} className="m-2 w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{announcement.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{announcement.description}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <ArrowRight />
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Announcement;
