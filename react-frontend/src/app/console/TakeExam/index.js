import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import { Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { remarkableKatexRender } from '../../../lib/InlineMath';

export default function TakeExam() {
  const { examID } = useParams();
  const [testData, setTestData] = useState({
    title: "",
    subj: "",
    topics: "",
    startTime: "",
    endTime: "",
    totalMarks: 0
  });
  const [problems, setProblems] = useState([]);
  const [userAnswers, setUserAnswers] = useState(
    problems.map(() => '')
  );

  const endTime = new Date(new Date(testData.startTime).getTime() + 30 * 60000); // 30 minutes from the start time
  const getTestInfo = async (examID) => {
    try {
      const APIRoot = process.env.REACT_APP_API_ROOT;
      const getTestInfoAPI = process.env.REACT_APP_GET_TEST_INFO;
      console.log(APIRoot + getTestInfoAPI + `?testID=${examID}`);
      const response = await fetch(APIRoot + getTestInfoAPI + `?testID=${examID}`, {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) {
        throw Error("Could not fetch test info");
      }
      const resp = await response.json();
      setTestData(resp.testInfo);
    } catch (err) {
      console.error("Could not fetch test info: ", err);
    }
  }

  const getProblems = async (examID) => {
    try {
      const APIRoot = process.env.REACT_APP_API_ROOT;
      const getproblemsAPI = process.env.REACT_APP_GET_TEST_PROBLEMS;
      const response = await fetch(APIRoot + getproblemsAPI + `?testID=${examID}`, {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) {
        throw Error("Could not fetch test problems");
      }
      const resp = await response.json();
      setProblems(resp.problems);
    } catch (err) {
      console.error("Could not fetch test problems: ", err);
    }
  }

  useEffect(() => {
    getTestInfo(examID);
    getProblems(examID);
    setUserAnswers(problems.map(() => ''));
  }, [examID]);

  const handleChange = (index, event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = event.target.value;
    setUserAnswers(updatedAnswers);
  };


  const handleSubmitExam = async () => {
    try {
      const response = await fetch('http://localhost:8000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAnswers, testData }),
      });

      if (response.ok) {
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    console.log('Submitting exam:', userAnswers, testData);
    alert('Exam submitted successfully!'); // Placeholder for now
  };

  return (
    <div className='flex items-start justify-center w-full h-full min-h-screen'>
      <div className='flex gap-2 items-start justify-end p-10 h-full w-1/5'>
      </div>
      <div className='flex flex-col gap-5 items-center w-3/5 h-full rounded-lg'>
        <div className='flex items-center w-full h-1/6 justify-between rounded-lg bg-neutral p-10'>
          <div>
            <h1 className="text-2xl text-accent font-bold">{testData.title}</h1>
            <p className="text-lg">{testData.subj} - {testData.topics}</p>
          </div>
          <div className="text-right">
            <p className="text-lg">Total Marks: {testData.totalMarks}</p>
            <div className='flex gap-2'><Clock /> <Countdown endTime={endTime} /></div>
          </div>
        </div>
        <div className='flex flex-col w-full p-5 gap-5 items-center'>
          <p className="text-xs text-info mb-6">{testData.instructions}</p>
          <div className='flex flex-col gap-5 items-center w-full p-2'>
            {problems.map((question, index) => (
              <div key={question.id} className="w-full mb-6">
                <span className="font-bold">Question {index + 1}:</span> 
                <div className="flex flex-col gap-4 text-lg font-normal mb-2" dangerouslySetInnerHTML={{__html: remarkableKatexRender(question.question)}}>
                </div>
                <textarea
                  value={userAnswers[index]}
                  onChange={(e) => handleChange(index, e)}
                  placeholder={`Enter your answer for question ${index + 1}`}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmitExam}
            className="bg-blue-600 text-white text-lg px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Answers
          </button>
        </div>
      </div>
      <div className='w-1/5 bg-red-700'>

      </div>
    </div>
  );
};
