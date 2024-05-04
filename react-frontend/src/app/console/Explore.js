import React from 'react';

export default function Explore() {

    const channelData = [
        {
            "id": 1,
            "name": "Udvash",
            "description": "Lege takho soth vabe, Sophno joy tumar ei hobe",
            "image": "https://futurestartup.b-cdn.net/wp-content/uploads/2019/08/udvash.jpg"
        },
        {
            "id": 2,
            "name": "Channel Name 2",
            "description": "Description of channel 2",
            "image": "https://futurestartup.b-cdn.net/wp-content/uploads/2019/08/udvash.jpg"
        },
        {
            "id": 3,
            "name": "Channel Name 3",
            "description": "Description of channel 3",
            "image": "https://futurestartup.b-cdn.net/wp-content/uploads/2019/08/udvash.jpg"
        },{
            "id": 1,
            "name": "Udvash",
            "description": "Lege takho soth vabe, Sophno joy tumar ei hobe",
            "image": "https://futurestartup.b-cdn.net/wp-content/uploads/2019/08/udvash.jpg"
        },
        {
            "id": 2,
            "name": "Channel Name 2",
            "description": "Description of channel 2",
            "image": "https://futurestartup.b-cdn.net/wp-content/uploads/2019/08/udvash.jpg"
        },
        {
            "id": 3,
            "name": "Channel Name 3",
            "description": "Description of channel 3",
            "image": "https://futurestartup.b-cdn.net/wp-content/uploads/2019/08/udvash.jpg"
        }

    ]
    
    return (
        <div className="container flex justify-center">
            <div className="grid grid-cols-3 gap-4">
                {channelData.map(channel => (
                    <div key={channel.id} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src={channel.image} alt={channel.name} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{channel.name}</h2>
                            <p>{channel.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Explore</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
