import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";

export default function Channel() {
    const [selectedGroup, setSelectedGroup] = useState(null); // State to track selected group

    // Function to handle group selection
    const handleGroupSelect = (groupName) => {
        setSelectedGroup(groupName);
    };
    const groupData = [
        {
            "name": "Medical",
            "image": "https://udvash.com/media/Images/UDVASH/program/2024/1/4.png",
            "peopleInvolved": 100

        },
        {
            "name": "Versity Ka",
            "image": "https://udvash.com/media/Images/UDVASH/program/2024/1/7.png",
            "peopleInvolved": 86
        },
        {
            "name": "Engineering",
            "image": "https://udvash.com/media/Images/UDVASH/program/2024/1/1.png",
            "peopleInvolved": 42
        },
        // Add more groups as needed
    ]
    const renderGroupContent = () => {
        // Check if a group is selected
        if (selectedGroup) {
            // Find the selected group from groupData array
            const selectedGroupData = groupData.find(group => group.name === selectedGroup);

            // If the selected group is found, render its content
            if (selectedGroupData) {
                return (
                    <div>
                        <h2>{selectedGroupData.name}</h2>
                        <p>People involved: {selectedGroupData.peopleInvolved}</p>
                        {/* Add more content specific to the selected group */}
                    </div>
                );
            } else {
                // If the selected group is not found, render a message indicating no content
                return <p>No content available for the selected group</p>;
            }
        } else {
            // If no group is selected, render a default message
            return <p>Please select a group</p>;
        }
    };


    return (
        <div className="flex flex-col h-full lg:px-auto lg:py-auto gap-2 overflow-hidden">
            <h1 className="hidden lg:block text-3xl lg:px-20">Enrolled Program</h1>
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start">


                        <div class="border-b border-gray-200 dark:border-gray-700">
                            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <li class="me-2">
                                    <a href="#" class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                        <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                        </svg>Annoucement
                                    </a>
                                </li>
                                <li class="me-2">
                                    <a href="#" class="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                                        <svg class="w-4 h-4 me-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                        </svg> Classword
                                    </a>
                                </li>
                                <li class="me-2">
                                    <a href="#" class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                        <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                                        </svg>People
                                    </a>
                                </li>
                                <li class="me-2">
                                    <a href="#" class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                        <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                        </svg>Exam
                                    </a>
                                </li>
                                <li>
                                    <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
                                </li>
                            </ul>
                        </div>


                        {/* Rendering content based on the selected group */}
                        {renderGroupContent()}
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="menu p-4 w-3/5 sm:w-1/3 lg:w-80 h-full bg-base-200 text-base-content">
                            {groupData.map((group, index) => (
                                <li key={index} onClick={() => handleGroupSelect(group.name)} className="cursor-pointer mb-4">
                                    <div className="flex  text-md font-normal bg-neutral shadow-xl rounded-xl">
                                        <div class="avatar">
                                            <div class="rounded-xl">
                                                <img src={group.image} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div>{group.name}</div>
                                            <div className="stat-value">{group.peopleInvolved}</div>
                                            <div className="stat-title">People involved</div></div>
                                    </div>
                                </li>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
