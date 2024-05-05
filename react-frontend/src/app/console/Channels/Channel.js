import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";
import Cookies from 'js-cookie';
import Announcement from './ContentComponents/Announcement';
import Exam from './ContentComponents/Exam';
import Classwork from './ContentComponents/Classwork';
import People from './ContentComponents/People';

export default function Channel() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    // const userID = Cookies.get('userID');
    // console.log(userID);
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
    ]
    const handleContentSelect = (contentName) => {
        console.log(selectedContent);
        setSelectedContent(contentName);
    };
    const renderGroupContent = () => {
        if (selectedGroup) {
            // Find the selected group from groupData array
            const selectedGroupData = groupData.find(group => group.name === selectedGroup);

            if (selectedGroupData) {
                return (
                    <div>
                        <h2>{selectedGroupData.name}</h2>
                        <p>People involved: {selectedGroupData.peopleInvolved}</p>
                        {/* Add more content specific to the selected group */}
                    </div>
                );
            } else {
                return <p>No content available for the selected group</p>;
            }
        } else {
            return <p>Please select a group</p>;
        }
    };
    const renderSelectedContent = () => {
        switch (selectedContent) {
            case 'Announcement':
                return <Announcement />;
            case 'Exam':
                return <Exam />;
            case 'Classwork':
                return <Classwork />;
            case 'People':
                return <People/>;
            default:
                return <p>Please select an option</p>;
        }
    };


    return (
        <div className="flex flex-col h-full lg:px-auto lg:py-auto gap-2 overflow-hidden">
            <h1 className="hidden lg:block text-3xl lg:px-20">Enrolled Program</h1>
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start">


                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <li className="me-2">
                                    <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 ${selectedContent === 'Announcement' ? 'border-blue-600 text-blue-600' : 'border-transparent text-black-600'} rounded-t-lg group`} onClick={() => handleContentSelect('Announcement')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-newspaper"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>Announcement
                                    </a>
                                </li>
                                <li className="me-2">
                                    <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 ${selectedContent === 'Classwork' ? 'border-blue-600 text-blue-600' : 'border-transparent text-black-600'} rounded-t-lg group`} onClick={() => handleContentSelect('Classwork')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg> Classwork
                                    </a>
                                </li>
                                <li className="me-2">
                                    <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 ${selectedContent === 'Exam' ? 'border-blue-600 text-blue-600' : 'border-transparent text-black-600'} rounded-t-lg group`} onClick={() => handleContentSelect('Exam')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-check"><path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" /><path d="m16 12 2 2 4-4" /><path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" /></svg>
                                        Exam
                                    </a>
                                </li>
                                <li className="me-2">
                                    <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 ${selectedContent === 'People' ? 'border-blue-600 text-blue-600' : 'border-transparent text-black-600'} rounded-t-lg group`} onClick={() => handleContentSelect('People')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>People
                                    </a>
                                </li>

                            </ul>
                        </div>
                        {/* Rendering content based on the selected group */}
                        {renderSelectedContent()}
                        {renderGroupContent()}
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="menu p-4 w-3/5 sm:w-1/3 lg:w-80 h-full bg-base-200 text-base-content">
                            {groupData.map((group, index) => (
                                <li key={index} onClick={() => handleGroupSelect(group.name)} className="cursor-pointer mb-4">
                                    <div className="flex  text-md font-normal bg-neutral shadow-xl rounded-xl">
                                        <div className="avatar">
                                            <div className="rounded-xl">
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
