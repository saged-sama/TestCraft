import React, { useState } from 'react';

export default function Exam() {
    const [selectedOptions, setSelectedOptions] = useState({});
    
    // Function to handle checkbox change for a specific problem statement
    const handleCheckboxChange = (event, problemId) => {
        setSelectedOptions({
            ...selectedOptions,
            [problemId]: event.target.value
        });
    };

    // Function to handle submission of answers
    const handleSubmit = () => {
        console.log("Selected Options:", selectedOptions);
    };

    const problems = [
        {
            id: 1,
            statement: "What is your favorite color?",
            options: ["Green", "Red", "White", "Black"]
        },
        {
            id: 2,
            statement: "What is your favorite animal?",
            options: ["Dog", "Cat", "Bird", "Fish"]
        },
        {
            id: 3,
            statement: "What is your favorite food?",
            options: ["Pizza", "Burger", "Sushi", "Pasta"]
        }
    ];

    return (
        <div className="flex flex-col items-center">
            {problems.map(problem => (
                <div key={problem.id} className="card w-96 bg-base-100 shadow-xl mb-4">
                    <div className="form-control">
                        <div className="question mb-4">{problem.statement}</div>
                        {problem.options.map((option, index) => (
                            <label key={index} className="cursor-pointer label">
                                <span className="label-text">{option}</span>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={selectedOptions[problem.id] === option}
                                    onChange={(event) => handleCheckboxChange(event, problem.id)}
                                    className="checkbox checkbox-info"
                                />
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </div>
    );
}
