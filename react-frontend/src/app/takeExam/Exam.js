import React, { useState, useEffect } from 'react';
import Countdown from '/Users/emon/Desktop/Projects/TestCraft/React-frontend/src/app/console/Channels/ContentComponents/Countdown.js';

const ExamInterface = () => {
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
    <div className="flex flex-col min-h-screen items-center bg-gray-900 py-8">
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
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

export default ExamInterface;
