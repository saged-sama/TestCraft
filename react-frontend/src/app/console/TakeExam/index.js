import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import { Clock } from 'lucide-react';

export default function TakeExam() {
  const [tests, setTests] = useState([
    {
      id: '8d5df87a-48f5-4b64-a2b7-918059c6c774',
      title: 'Math Quiz',
      subj: 'Mathematics',
      topics: 'Algebra',
      startTime: new Date().toISOString(),
      endTime: '2024-05-12T10:00:00',
      totalMarks: 50,
      instructions: 'Please read the questions carefully and provide your answers in the text areas provided.',
      questions: [
        {
          id: '1',
          question: 'Explain the concept of variables in algebra.',
        },
        {
          id: '2',
          question: 'Describe the process of solving a quadratic equation.',
        },
        {
          id: '3',
          question: 'Explain the concept of variables in algebra.',
        },
        {
          id: '4',
          question: 'Describe the process of solving a quadratic equation.',
        },
        {
          id: '5',
          question: 'Explain the concept of variables in algebra.',
        },
        {
          id: '6',
          question: 'Describe the process of solving a quadratic equation.',
        }
      ],
    },
  ]);

  const [testData, setTestData] = useState(tests[0]);
  const [userAnswers, setUserAnswers] = useState(
    tests[0].questions.map(() => '')
  );

  const endTime = new Date(new Date(testData.startTime).getTime() + 30 * 60000); // 30 minutes from the start time

  useEffect(() => {
    setUserAnswers(testData.questions.map(() => ''));
  }, [testData]);

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
    <div className='flex items-center justify-center w-full h-full'>
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
            {testData.questions.map((question, index) => (
              <div key={question.id} className="w-full mb-6">
                <p className="text-lg font-semibold mb-2">
                  <span className="font-bold">Question {index + 1}:</span> {question.question}
                </p>
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
  )

  return (
    <div className="flex flex-col items-center bg-gray-900 py-8">
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <header className="bg-gray-700 text-white py-6 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{testData.title}</h1>
            <p className="text-lg">{testData.subj} - {testData.topics}</p>
          </div>
          <div className="text-right">
            <p className="text-lg">Total Marks: {testData.totalMarks}</p>
            <div className="mt-2">
              <Countdown endTime={endTime} />
            </div>
          </div>
        </header>
        <main className="p-6">
          <p className="text-gray-300 text-lg mb-6">{testData.instructions}</p>
          <div>
            {testData.questions.map((question, index) => (
              <div key={question.id} className="mb-6">
                <p className="text-lg font-semibold mb-2 text-white">
                  <span className="font-bold">Question {index + 1}:</span> {question.question}
                </p>
                <textarea
                  value={userAnswers[index]}
                  onChange={(e) => handleChange(index, e)}
                  placeholder={`Enter your answer for question ${index + 1}`}
                  className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmitExam}
            className="bg-blue-600 text-white text-lg px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Exam
          </button>
        </main>
      </div>
    </div>
  );
};
