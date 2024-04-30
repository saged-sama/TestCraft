import { remarkableKatexRender } from "../../../../lib/InlineMath";
export default function Problem(props) {
    const { problemss, deleteProblem } = props;

    return (
        <div className="flex flex-col w-2/3 h-screen overflow-y-scroll items-center">
            {problemss.map(problem => {
                return (
                    <div key={problem.problemID} className="card card-compact text-md font-normal w-11/12 m-2 bg-neutral shadow-xl p-2">
                        <div className=" text-xl font-medium">
                            <div className="card-body gap-4">
                                <div className="flex flex-col gap-2">
                                    <h1 className="flex gap-1"><span className="text-info">Subject:</span>{problem.subject}</h1>
                                    <h1 className="flex gap-1"><span className="text-info">Topics:</span>{problem.topics}</h1>
                                </div>
                                <div className="flex flex-col gap-4 rounded-lg bg-base-100 p-2">
                                    <div><b className="text-bold text-xl">Question:</b> <div className="flex flex-col gap-4 leading-relaxed" dangerouslySetInnerHTML={{__html: remarkableKatexRender(problem.description)}}></div></div>
                                    <div><b className="text-bold text-xl">Answer:</b> <div className="flex flex-col gap-4 leading-relaxed" dangerouslySetInnerHTML={{__html: remarkableKatexRender(problem.solution)}}></div></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                
                            </div>
                            <div className="flex gap-2 m-2">
                                <button className="btn btn-sm btn-info">Edit</button>
                                <button className="btn btn-sm btn-accent" onClick={() => deleteProblem(problem.problemID)}>Delete</button> 
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}