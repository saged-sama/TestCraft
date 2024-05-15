import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dateExtractFromMySQLDateTime } from '../../../lib/useDate';

export default function Explore() {
    const [collections, setCollections] = useState([])
    useEffect(() => {
        async function fetchChannels() {
            try {
                const response = await fetch('http://localhost:8000/get-channels', {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) {
                    console.error("Chould not get channels");
                }
                const coll = await response.json();
                setCollections(coll.channels || []);
                console.log(coll.channels);
            } catch (err) {
                console.error("Could not get channels");
            }
        };
        fetchChannels();
    }, []);

    return (
        <div className="flex flex-col h-screen w-full items-center">
            <div className="container">
                <div className="grid grid-cols-3 gap-4">
                    {collections.length > 0 && collections.map(channel => (
                        <div key={channel.channelID} className="card card-compact w-96 bg-neutral shadow-xl">
                            {/* <figure><img src='https://futurestartup.b-cdn.net/wp-content/uploads/2019/08/udvash.jpg' alt={channel.name} /></figure> */}
                            <div className="flex flex-col items-start text-primary p-2 justify-end h-52 w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-black-background-with-cubes_23-2149177092.jpg?t=st=1715742364~exp=1715745964~hmac=100b8d4c19be451167db884d6071280cbf96f3d73dfca3eefc1402bae63f0772&w=996')" }}>
                                <h2 className="card-title">{channel.channelName}</h2>
                            </div>
                            <div className="card-body">
                                <div>
                                    {channel.ownerName} | {dateExtractFromMySQLDateTime(channel.createdOn)}
                                </div>
                                {/* <p>Lege takho Soth vabe</p> */}
                                <div className="card-actions justify-end">
                                    <Link to={`/app/channels/${channel.channelID}/0`} className="btn btn-primary">Explore</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}