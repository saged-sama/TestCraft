import Countdown from "../../TakeExam/Countdown"
import React, { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Search, CirclePlus } from "lucide-react";
import { dateExtractFromMySQLDateTime } from "../../../../lib/useDate";
import { remarkableKatexRender } from "../../../../lib/InlineMath";
import { useParams } from "react-router-dom";

export default function Exams() {
    const { channelID, groupID } = useParams();
    const [collections, setCollections] = useState([]);
    const [problems, setProblems] = useState([]);
    const [newProblem, setNewProblem] = useState({});
    console.log(problems);
    const [testProblems, setTestProblems] = useState([]);
    const [collection, setCollection] = useState({
        collectionID: "",
        collectionName: ""
    });

    async function fetchCollections() {
        try {
            const APIRoot = process.env.REACT_APP_API_ROOT;
            const getAllCollectionByUserID = process.env.REACT_APP_GET_ALL_COLLECTIONS_BY_USER_ID;
            const response = await fetch(APIRoot + getAllCollectionByUserID, {
                method: "GET",
                credentials: "include"
            });
            if (!response.ok) {
                throw Error("Could not collect collections");
            }
            const coll = await response.json();
            coll.forEach(c => {
                // eslint-disable-next-line
                c.createdOn = dateExtractFromMySQLDateTime(c.createdOn);
            });
            setCollections(coll);
        } catch (err) {
            console.error("Could not collect collections:", err);
        }
    };

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
        setTestProblems([...testProblems, newProblem]);
    };

    const searchAnnouncement = (e) => {
        // Logic to search through announcements
    };

    const getTests = async() => {
        try{
            const APIRoot = process.env.REACT_APP_API_ROOT;
            const getTests = process.env.REACT_APP_GET_TESTS;
            const response = await fetch(APIRoot + getTests + `?channelID=${channelID}&groupID=${groupID}`, {
                method: "GET",
                credentials: "include"
            });
            if (!response.ok) {
                throw Error("Could not get tests");
            }
            const resp = await response.json();
            settests(resp.tests);
        }catch(err){
            console.error("Could not get tests: ", err);
        }
    }

    const addExam = async() => {
        try{
            const APIRoot = process.env.REACT_APP_API_ROOT;
            const addNewTestAPI = process.env.REACT_APP_ADD_NEW_TEST;
            const response = await fetch(APIRoot + addNewTestAPI, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    channelID: channelID,   
                    groupID: groupID,
                    newExam: newExam,
                    testProblems: testProblems
                })
            });
            if (!response.ok) {
                throw Error("Could not add exam");
            }
            document.getElementById('newExam').close();
            setNewExam({
                title: "",
                subj: "",
                topics: "",
                startTime: "",
                endTime: "",
                totalMarks: 0
            });
            setTestProblems([]);
            setProblems([]);
            setCollection({});
            getTests();
            closeDialog();
        }catch(err){
            console.error("Could not create new Test: ", err);
        }
    };

    const closeDialog = () => {
        document.getElementById("newExam").close();
    };

    const handleCollectionSelection = async (collectionID) => {
        const fetchCollectionInfo = async (collectionID) => {
            try {
                const APIRoot = process.env.REACT_APP_API_ROOT;
                const getCollectionInfo = process.env.REACT_APP_GET_COLLECTION_INFO;
                const response = await fetch(APIRoot + getCollectionInfo + `?collectionID=${collectionID}`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) {
                    throw Error("Could not collect collections");
                }
                const coll = await response.json();
                setCollection(coll.collection);
            } catch (err) {
                console.error("Could not fetch collection");
            }
        }
        fetchCollectionInfo(collectionID);
        const getProblemsByCollection = async (collectionID) => {
            try {
                const APIRoot = process.env.REACT_APP_API_ROOT;
                const getProblemsByCollectionAPI = process.env.REACT_APP_GET_PROBLEMS_BY_COLLECTIONS;
                const response = await fetch(APIRoot + getProblemsByCollectionAPI + `?collectionID=${collectionID}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw Error("Could not get problems by collection");
                }
                const resp = await response.json();
                const probs = resp.problems;
                setProblems(probs);
            } catch (err) {
                console.error("Could not get problems by collection:", err);
            }
        };
        getProblemsByCollection(collectionID);
        // console.log(collectionID);
    }

    useEffect(() => {
        fetchCollections();
        getTests();
    }, []);

    return (
        <div className='m-2 p-2 w-full h-screen overflow-y-scroll'>

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
                    <div className="card card-compact text-md font-normal w-1/3 pr-4 overflow-y-scroll">
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
                            <textarea className="grow h-80 md:input-md input-sm" placeholder="Question" value={newProblem.description} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />

                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-center">
                                    <input type="text" className="input input-bordered input-md" value={collection.collectionName} />
                                    <details className="dropdown dropdown-top dropdown-left">
                                        <summary className="m-1 btn">Choose a Collection</summary>
                                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                            {collections.map((coll, index) => {
                                                return (
                                                    <button onClick={() => handleCollectionSelection(coll.collectionID)}><li key={index} style={{ cursor: "pointer" }}>{coll.collectionName}</li></button>
                                                )
                                            })}
                                        </ul>
                                    </details>
                                </div>
                                <div className="flex">
                                    <ul className="p-2 menu shadow">
                                        {problems.map((problem, index) => {
                                            return (
                                                <button key={index} onClick={() => setNewProblem(problem)} className="btn w-full">
                                                    Problem {index+1}: 
                                                    <li key={index} style={{ cursor: "pointer" }} className="w-full overflow-hidden">{problem.subject} | {problem.topics}</li>
                                                </button>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>

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
                            <div className="h-full"> {/* Add this container */}
                                {testProblems.map((question, index) => (
                                    <div key={index} className="bg-base-300 p-4 rounded-lg mb-4">
                                        <p className="mb-2 font-bold">Question {index + 1}</p>
                                        <div className="mb-2" dangerouslySetInnerHTML={{__html: remarkableKatexRender(question.description)}}></div>
                                        <p className="mb-2 font-bold">Solution</p>
                                        <div className="mb-2" dangerouslySetInnerHTML={{__html: remarkableKatexRender(question.solution)}}></div>
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