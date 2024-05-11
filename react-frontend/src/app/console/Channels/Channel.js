import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";
import Cookies from 'js-cookie';
import Announcement from './ContentComponents/Announcement';
import Exam from './ContentComponents/Exam';
import Classwork from './ContentComponents/Classwork';
import People from './ContentComponents/People';
import { Bell, Layers3Icon, BookOpenCheck, Users } from 'lucide-react';

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
                return <People />;
            default:
                return <p>Please select an option</p>;
        }
    };


    return (
        <div className="flex h-full w-full">
            <div className='flex flex-col items-center'>
                <h1 className="text-2xl">Enrolled Program</h1>
                <div>
                    <div className="menu p-5 w-80 h-full">
                        {groupData.map((group, index) => (
                            <li key={index} onClick={() => handleGroupSelect(group.name)} className="cursor-pointer mb-4">
                                <div className="flex text-md font-normal bg-neutral">
                                    <div className="avatar">
                                        <img src={group.image} />
                                    </div>
                                    <div className="flex flex-col">
                                        <div>{group.name}</div>
                                        <div className="stat-value">{group.peopleInvolved}</div>
                                        <div className="stat-title">People involved</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="me-2">
                            <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 ${selectedContent === 'Announcement' ? 'border-blue-600 text-blue-600' : 'border-transparent text-black-600'} rounded-t-lg group`} onClick={() => handleContentSelect('Announcement')}>
                                <Bell />Announcement
                            </a>
                        </li>
                        <li className="me-2">
                            <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 ${selectedContent === 'Classwork' ? 'border-blue-600 text-blue-600' : 'border-transparent text-black-600'} rounded-t-lg group`} onClick={() => handleContentSelect('Classwork')}>
                                <Layers3Icon /> Classwork
                            </a>
                        </li>
                        <li className="me-2">
                            <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 ${selectedContent === 'Exam' ? 'border-blue-600 text-blue-600' : 'border-transparent text-black-600'} rounded-t-lg group`} onClick={() => handleContentSelect('Exam')}>
                                <BookOpenCheck />Exam
                            </a>
                        </li>
                        <li className="me-2">
                            <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 ${selectedContent === 'People' ? 'border-blue-600 text-blue-600' : 'border-transparent text-black-600'} rounded-t-lg group`} onClick={() => handleContentSelect('People')}>
                                <Users />People
                            </a>
                        </li>
                    </ul>
                    <hr />
                </div>
                <div className="flex">
                    {renderSelectedContent()}
                </div>
            </div>
        </div>
    );
}
