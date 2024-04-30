export default function Problem(props) {
    const { problemss } = props;

    return (
        <div className="flex flex-col w-3/5 h-screen overflow-y-scroll items-center">
            {problemss.map(problem => {
                return (
                    <div key={problem.problemID} className="card card-compact text-md font-normal w-3/4 m-2 bg-neutral shadow-xl p-2">
                        <div className=" text-xl font-medium">
                            <div className="card-body gap-4">
                                <div className="flex flex-col gap-2">
                                    <h1 className="flex gap-1"><span className="text-info">Subject:</span>{problem.subject}</h1>
                                    <h1 className="flex gap-1"><span className="text-info">Topics:</span>{problem.topics}</h1>
                                </div>
                                <div className="flex flex-col gap-4 rounded-lg bg-base-100 p-2">
                                    <p>Question: {problem.description}</p>
                                    <p>Answer: {problem.solution}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                
                            </div>
                            <div className="flex gap-2 m-2">
                                <button className="btn btn-sm btn-info">Edit</button>
                                <button className="btn btn-sm btn-accent">Delete</button> 
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}