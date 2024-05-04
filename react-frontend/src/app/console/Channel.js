import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";

export default function Channel() {
    // Dummy data for groups, announcements, and content
    const groups = [
        { id: 1, name: "Group 1", announcements: ["Announcement 1", "Announcement 2"], content: "Content 1" },
        { id: 2, name: "Group 2", announcements: ["Announcement 3", "Announcement 4"], content: "Content 2" },
        { id: 3, name: "Group 3", announcements: ["Announcement 5", "Announcement 6"], content: "Content 3" }
    ];

    // State to track the selected group
    const [selectedGroup, setSelectedGroup] = useState(groups.length > 0 ? groups[0].name : null); // Initialize with the name of the first group or null if groups array is empty

    // Function to handle clicking on a group
const handleGroupClick = (groupName) => {
    setSelectedGroup(selectedGroup === groupName ? null : groupName);
};

    return (
        <div className="flex flex-col h-full lg:px-auto lg:py-auto gap-2 overflow-hidden">
            <h1 className="hidden lg:block text-3xl lg:px-20">Dashboard</h1>
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start">
                        <label htmlFor="my-drawer-2" className="flex m-2 justify-center items-center w-50 drawer-button lg:hidden gap-1"> <ChevronRight className="w-5 h-5 border-2 rounded-xl" /> Collections </label>
                        
                        {/* Rendering content based on the selected group */}
                        {selectedGroup ? (
                            <div className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                                <h2>Announcements</h2>
                                <ul>
                                    {/* Rendering announcements of the selected group */}
                                    {groups.find(group => group.name === selectedGroup).announcements.map((announcement, index) => (
                                        <li key={index}>{announcement}</li>
                                    ))}
                                </ul>
                                <h2>Content</h2>
                                <p>{groups.find(group => group.name === selectedGroup).content}</p>
                            </div>
                        ) : (
                            <div className="flex justify-center rounded w-full h-full">
                                {/* Placeholder content */}
                                No group selected
                            </div>
                        )}
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-3/5 sm:w-1/3 lg:w-80 h-full bg-base-200 text-base-content">
                            {/* Render group names as links */}
                            {groups.map(group => (
                                <li key={group.id} onClick={() => handleGroupClick(group.name)}>
                                    <span className="btn btn-ghost">{group.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
