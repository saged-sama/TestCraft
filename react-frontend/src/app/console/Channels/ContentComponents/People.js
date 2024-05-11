import React from 'react';

const People = () => {
    const peoples = [
        {
            "username": "Emon",
            "email": "Contact.emonkhan@gmail.com"
        },
        {
            "username": "Sajid",
            "email": "mahmudulhasanshajid@gmail.com"
        },
        {
            "username": "Rafin",
            "email": "sjrafin@gmail.com"
        }
    ]
    return (
        <div className='m-2 p-2 w-full'>
            {peoples.map((people) => {
                return (
                    <div class="w-full m-1 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <img class="w-10 h-10 rounded-full" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Neil image" />
                            </div>
                            <div class="flex-1 min-w-0 ms-4">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {people.username}
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {people.email}
                                </p>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    );
}

export default People;
