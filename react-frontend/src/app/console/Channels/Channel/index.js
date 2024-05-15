import React, { useEffect, useState } from 'react';
import { Bell, BookOpenCheck,  } from 'lucide-react';
import { useParams, Routes, Route, Link, useLocation } from 'react-router-dom';
import Announcements from './Announcements';
import Exams from './Exams';
import { dateExtractFromMySQLDateTime } from '../../../../lib/useDate';

export default function Channel() {
    const location = useLocation();
    const url = location.pathname.split("/");
    const { channelID, groupID } = useParams();
    const [groups, setGroups] = useState([]);

    const getGroups = async (channelID) => {
        try {
            const APIRoot = process.env.REACT_APP_API_ROOT;
            // console.log(APIRoot);
            const getGroupsAPI = process.env.REACT_APP_GET_GROUPS_API;
            const response = await fetch(APIRoot + getGroupsAPI + `?channelID=${channelID}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                console.error("Could not add collection");
            }
            const resp = await response.json();
            setGroups(resp.groups);
        } catch (err) {
            console.error("Couldn't add collection: ", err);
        }
    }

    useEffect(() => {
        getGroups(channelID)
    }, [channelID]);

    return (
        <div className="flex h-full w-full">
            <div className='flex flex-col items-center w-1/6'>
                <h1 className="text-2xl">Groups</h1>
                <div className="menu p-5 w-full">
                    {groups.map((group, index) => (
                        <Link key={index} to={`/app/channels/${channelID}/${group.groupid}/`} className={`cursor-pointer p-2 rounded-lg mb-4 ${groupID === group.groupid ? "bg-blue-300" : "bg-neutral"}`}>
                            <div className="flex text-md font-normal ">
                                <div className="flex flex-col gap-2">
                                    <div className='text-xs'>{group.createdBy}</div>
                                    <div className="stat-value text-2xl">{group.groupName}</div>
                                    <div className="stat-title text-xs">{dateExtractFromMySQLDateTime(group.createdOn)}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-5/6'>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="me-2">
                            <Link to={`/app/channels/${channelID}/${groupID}`} className={`inline-flex items-center justify-center p-4 border-b-2 $ rounded-t-lg group ${url[url.length-1] !== `exams` ? "border-blue-600 text-blue-600": "text-black-200 border-transparent"}`}>
                                <Bell />Announcements
                            </Link>
                        </li>
                        <li className="me-2">
                            <Link to={`/app/channels/${channelID}/${groupID}/exams`} className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${url[url.length-1] === `exams` ? "border-blue-600 text-blue-600": "text-black-200 border-transparent"}`} >
                                <BookOpenCheck />Exams
                            </Link>
                        </li>
                    </ul>
                    <hr />
                </div>
                <div className="flex bg-neutral p-2 m-2 rounded-xl h-full">
                    {/* {renderSelectedContent()} */}
                    <Routes>
                        <Route exact path='/' element={<Announcements />} />
                        <Route path='/exams' element={<Exams />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
