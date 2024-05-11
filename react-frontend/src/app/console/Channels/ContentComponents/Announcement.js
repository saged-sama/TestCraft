import React from 'react';
import { ArrowRight } from 'lucide-react';

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

    return (
        <div className='m-2 p-2'>
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
