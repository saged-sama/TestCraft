import Countdown from "../../TakeExam/Countdown"
import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Search, CirclePlus } from "lucide-react";

export default function Exams() {
    const [tests, settests] = useState([
        {
            "id": "8d5df87a-48f5-4b64-a2b7-918059c6c774",
            "title": "Math Quiz",
            "subj": "Mathematics",
            "topics": "Algebra",
            "startTime": "2024-05-12T09:00:00",
            "endTime": "2024-05-12T10:00:00",
            "totalMarks": 50,
            "questions": [
                {
                    "id": "1",
                    "question": "Explain the concept of variables in algebra.",
                },
                {
                    "id": "2",
                    "question": "Describe the process of solving a quadratic equation.",
                }
            ]
        },
    ])

    const [newExam, setNewExam] = useState({
        title: "",
        subj: "",
        topics: "",
        startTime: "",
        endTime: "",
        totalMarks: 0,
        questions: []
    });

    const [newQuestion, setNewQuestion] = useState({
        id: "",
        question: "",
        answer: ""
    });

    const addQuestion = () => {
        if (newQuestion.question.trim() !== '') {
            setNewExam({ ...newExam, questions: [...newExam.questions, newQuestion] });
            setNewQuestion({
                id: "",
                question: "",
                answer: ""
            });
        }
    };

    const searchAnnouncement = (e) => {
        // Logic to search through announcements
    };

    const addExam = () => {
        // Validate form data
        if (
            newExam.title.trim() === '' ||
            newExam.subj.trim() === '' ||
            newExam.topics.trim() === '' ||
            newExam.startTime.trim() === '' ||
            newExam.endTime.trim() === '' ||
            newExam.totalMarks <= 0 ||
            newExam.questions.length === 0
        ) {
            alert('Please fill in all the required fields and add at least one question.');
            return;
        }

        const examData = {
            id: Date.now().toString(), // Generate a unique ID
            title: newExam.title.trim(),
            subj: newExam.subj.trim(),
            topics: newExam.topics.trim(),
            startTime: newExam.startTime,
            endTime: newExam.endTime,
            totalMarks: newExam.totalMarks,
            questions: newExam.questions.map((question, index) => ({
                id: (index + 1).toString(),
                question: question.question.trim(),
                answer: question.answer.trim(),
            })),
        };

        // Here, you can perform any necessary operations with the examData
        // For example, you can send it to a server using an API call or save it locally

        console.log('New Exam Data:', examData);

        // Reset form data
        setNewExam({
            title: '',
            subj: '',
            topics: '',
            startTime: '',
            endTime: '',
            totalMarks: 0,
            questions: [],
        });
        settests([...tests, examData]);
        // Close the dialog
        document.getElementById('newExam').close();
    };

    const closeDialog = () => {
        document.getElementById("newExam").close();
    };

    return (
        <div className='m-2 p-2 w-full h-screen'>

            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <button className="btn btn-neutral btn-ghost btn-sm" onClick={() => document.getElementById("newExam").showModal()}>
                    <span className="flex items-center gap-1"><CirclePlus className="w-4 h-4 text-primary" /> Give a New Test </span>
                </button>

                <label className="hidden input input-bordered  md:flex items-center gap-2">
                    <input id="searchAnnouncement" type="text" className="grow" placeholder="Search Tests..." onChange={searchAnnouncement} />
                    <Search />
                </label>
            </div>

            <dialog id="newExam" className="modal">
                <div className="flex flex-col md:flex-row modal-box md:w-11/12 max-w-7xl h-screen md:h-3/3 gap-5">
                    <div className="card card-compact text-md font-normal w-1/3 pr-4">
                        <div className="card-body flex flex-col">
                            <div className="flex justify-between">
                                <h1>Create New Test</h1>
                            </div>
                            <div className="card-title text-sm">
                                <label className="input w-full input-bordered flex items-center">
                                    <input type="text" className="grow md:input-md input-sm" placeholder="Exam Title" value={newExam.title} onChange={(e) => setNewExam({ ...newExam, title: e.target.value })} />
                                </label>
                            </div>
                            <label className="input w-full input-bordered flex items-center">
                                <input type="text" className="grow md:input-md input-sm" placeholder="Subject" value={newExam.subj} onChange={(e) => setNewExam({ ...newExam, subj: e.target.value })} />
                            </label>
                            <label className="input w-full input-bordered flex items-center">
                                <input type="text" className="grow md:input-md input-sm" placeholder="Topics" value={newExam.topics} onChange={(e) => setNewExam({ ...newExam, topics: e.target.value })} />
                            </label>
                            <label className="input w-full input-bordered flex items-center">
                                <input type="datetime-local" className="grow md:input-md input-sm" placeholder="Start Time" value={newExam.startTime} onChange={(e) => setNewExam({ ...newExam, startTime: e.target.value })} />
                            </label>
                            <label className="input w-full input-bordered flex items-center">
                                <input type="datetime-local" className="grow md:input-md input-sm" placeholder="End Time" value={newExam.endTime} onChange={(e) => setNewExam({ ...newExam, endTime: e.target.value })} />
                            </label>
                            <label className="input w-full input-bordered flex items-center">
                                <input type="number" className="grow md:input-md input-sm" placeholder="Total Marks" value={newExam.totalMarks} onChange={(e) => setNewExam({ ...newExam, totalMarks: e.target.value })} />
                            </label>
                            <h2>Add Questions</h2>
                            <textarea className="grow md:input-md input-sm" placeholder="Question" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />
                            
                            <div className="flex gap-2">
                                <button onClick={addQuestion} className="btn btn-success btn-md">Add Question</button>
                                <button onClick={addExam} className="btn btn-success btn-md">Create Exam</button>
                            </div>
                        </div>
                    </div>

                    <div className="w-2/3">
                        <div className="card bg-base-200 p-4 rounded-lg h-full overflow-y-auto">
                            <h2 className="text-lg font-bold mb-2 text-accent">Preview</h2>
                            <div className="flex flex-col gap-1">
                                <p className="mb-1">Exam Title: {newExam.title}</p>
                                <p className="mb-1">Subject: {newExam.subj}</p>
                                <p className="mb-1">Topics: {newExam.topics}</p>
                                <p className="mb-1">Start Time: {newExam.startTime}</p>
                                <p className="mb-1">End Time: {newExam.endTime}</p>
                                <p className="mb-1">Total Marks: {newExam.totalMarks}</p>
                            </div>
                            <h3 className="text-lg font-bold mt-5">Questions</h3>
                            <div className="max-h-64 overflow-y-auto"> {/* Add this container */}
                                {newExam.questions.map((question, index) => (
                                    <div key={index} className="bg-base-300 p-4 rounded-lg mb-4">
                                        <p className="mb-2 font-bold">Question {index + 1}</p>
                                        <p className="mb-2">{question.question}</p>
                                        <p className="mb-2"><strong>Answer:</strong> {question.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={closeDialog}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </dialog>

            {tests.map((test) => (
                <div key={test.id} className="bg-base-100 rounded-lg m-2 w-1/2">
                    <div className="p-6 rounded-lg shadow">
                        <div className='flex p-2'>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight">{test.title}</h5>
                            <div className='flex-grow' />
                            <Countdown endTime={test.endTime} />
                        </div>
                        <hr />
                        <p className="mb-3 font-normal">Subject: {test.subj}</p>
                        <p className="mb-3 font-normal">Topics: {test.topics}</p>
                        <p className="mb-3 font-normal">Start Time: {new Date(test.startTime).toLocaleString()}</p>
                        <p className="mb-3 font-normal">Total Marks: {test.totalMarks}</p>
                        <a
                            href={`http://localhost:3000/app/Exam/${test.id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center btn btn-info"
                        >
                            Start Exam
                            <ArrowRight />
                        </a>
                    </div>
                </div>

            ))}
        </div>
    );
}