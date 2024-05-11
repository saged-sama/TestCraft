import React from 'react';
import { ArrowRight } from 'lucide-react';
import Countdown from './Countdown';

const Exam = () => {
    const tests = [
        {
            "id": "8d5df87a-48f5-4b64-a2b7-918059c6c774",
            "title": "Math Quiz",
            "subj": "Mathematics",
            "topics": "Algebra",
            "startTime": "2024-05-12T09:00:00",
            "endTime": "2024-05-12T10:00:00",
            "totalMarks": 50
        },
        {
            "id": "1a3b31cc-7214-4b42-b7f1-85a768ff8d3f",
            "title": "Science Test",
            "subj": "Science",
            "topics": "Biology",
            "startTime": "2024-05-13T10:30:00",
            "endTime": "2024-05-13T11:30:00",
            "totalMarks": 40
        },
        {
            "id": "f3a1cf3a-5422-4ff9-b104-5113b21a5675",
            "title": "History Exam",
            "subj": "History",
            "topics": "World War II",
            "startTime": "2024-05-14T13:00:00",
            "endTime": "2024-05-14T15:00:00",
            "totalMarks": 100
        },
        {
            "id": "7f9715a5-3ff5-4a5e-a675-77fc5e2bfc4e",
            "title": "English Quiz",
            "subj": "English",
            "topics": "Literature",
            "startTime": "2024-05-15T11:00:00",
            "endTime": "2024-05-15T12:00:00",
            "totalMarks": 30
        },
        {
            "id": "ccf4e92f-3a52-4d81-b3f4-9d061dc1e6fc",
            "title": "Physics Test",
            "subj": "Physics",
            "topics": "Mechanics",
            "startTime": "2024-05-16T14:30:00",
            "endTime": "2024-05-16T16:00:00",
            "totalMarks": 60
        }
    ]
    return (
        <div className='m-2 p-2 w-full'>
            {tests.map((test) => (
                <div key={test.id} className="m-2 w-1/2">
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className='flex p-2'>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{test.title}</h5>
                            <div className='flex-grow' />
                            <Countdown endTime={test.endTime} />
                        </div>
                        <hr/>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Subject: {test.subj}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Topics: {test.topics}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Start Time: {new Date(test.startTime).toLocaleString()}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total Marks: {test.totalMarks}</p>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Start Exam
                            <ArrowRight />
                        </a>
                    </div>
                </div>

            ))}
        </div>
    );
}
export default Exam;
