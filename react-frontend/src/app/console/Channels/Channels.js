import React, { useEffect, useState } from 'react';

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
                    console.error("Chould not collect collections");
                }
                const coll = await response.json();
                setCollections(coll.channels || []);
                console.log(coll.channels);
            } catch (err) {
                console.error("Could not collect collections");
            }
        };
        fetchChannels();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-8 mb-4 text-3xl font-bold">All of My Channel</h1>
            <div className="container">
                <div className="grid grid-cols-3 gap-4">
                    {collections.length > 0 && collections.map(channel => (
                        <div key={channel.channelID} className="card card-compact w-96 bg-base-100 shadow-xl">
                            <figure><img src='https://futurestartup.b-cdn.net/wp-content/uploads/2019/08/udvash.jpg' alt={channel.name} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{channel.channelName}</h2>
                                <p>Lege takho Soth vabe</p>
                                <div className="card-actions justify-end">
                                    <a href={`Channels/` + channel.channelID} className="btn btn-primary">Explore</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}