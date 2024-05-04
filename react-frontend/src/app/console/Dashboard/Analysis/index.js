import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { useEffect } from "react";
import { Square } from 'lucide-react';

export default function Analysis() {
    const [radarData, setRadarData] = useState([]);
    const [radarLayout, setRadarLayout] = useState({});

    const [scatterData, setScatterData] = useState([]);
    const [scatterLayout, setScatterLayout] = useState({});
    const config = {
        displayModeBar: false,
        staticPlot: true
    };

    const ScatterPlot = () => {
        const xArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        const yArray = [10, 20, 30, 60, 50, 60, 70, 80, 90, 100];

        // Define Data
        const data = [{
                x: xArray,
                y: yArray,
                name: "Physics",
                mode: "lines+markers",
                type: "scatter"
            },
            {
                x: xArray,
                y: yArray,
                name: "Chemistry",
                mode: "lines+markers",
                type: "scatter"
            },
            {
                x: xArray,
                y: yArray,
                name: "Biology",
                mode: "lines+markers",
                type: "scatter"
            }
        ];
        const xTickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        const yTickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        // Define Layout
        const layout = {
            xaxis: {
                // type: "date",
                range: [0, 100],
                tickfont: {
                    color: 'orange',
                    weight: "bold",
                    size: "12"
                },
                tickvals: xTickValues,
                showgrid: false,
            },
            yaxis: {
                range: [0, 100],
                tickfont: {
                    color: 'cyan',
                    weight: "bold",
                    size: "12"
                },
                tickvals: yTickValues,
                showgrid: false
            },
            title: {
                text: "Temporal Score Data",
                font: {
                    color: "yellow"
                }
            },
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            margin: {
                l: 30,
                r: 30,
                t: 30,
                b: 30
            },
        };
        setScatterData(data);
        setScatterLayout(layout);
    };

    const RadarChart = () => {
        setRadarData([{
            type: 'scatterpolar',
            r: [39, 68, 86, 77, 82, 99, 60],
            theta: ['Physics', 'Biology', 'Chemistry', 'Danish', 'English', 'Anthropology', "Mathematics"],
            fill: 'toself',
            marker: {
                color: "red"
            }
        }]);

        setRadarLayout({
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 100],
                    tickfont: {
                        color: "cyan",
                        weight: "bold",
                        size: "10"
                    },
                    tickvals: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                },
                angularaxis: {
                    tickfont: {
                        color: 'orange',
                        weight: "bold",
                        size: "12"
                    },
                },
                bgcolor: "transparent"
            },
            showlegend: false,
            modebar: false,
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            margin: {
                l: 20,
                r: 20,
                t: 20,
                b: 20
            }
        });
    };

    useEffect(() => {
        RadarChart();
        ScatterPlot();
    }, []);

    return (
        <div className="flex flex-col mx-5 gap-2 w-full h-full">
            {/* Header */}
            <div className="hidden border-b-2 lg:flex">
                <h1 className="text-xl">Statistical Progress Analysis</h1>
            </div>
            <div className="flex w-full h-1/2">
                <div className="flex w-1/2 h-full justify-center items-center">
                    <Plot
                        data={scatterData}
                        layout={scatterLayout}
                        // style={{ width: '100%', height: '100%' }}
                        className='w-full h-5/6'
                        config={config}
                    />
                </div>
                <div className="flex w-1/2 h-full justify-center items-center">
                    <Plot
                        data={radarData}
                        layout={radarLayout}
                        // style={{ width: '100%', height: '100%' }}
                        className='w-5/6 h-5/6'
                        config={config}
                    />
                    <div className='flex flex-col gap-5 text-xs'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-1'><Square className='w-4 h-4 fill-primary' />Strongest:</div> <div className='text-primary'>Anthropology</div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-1'><Square className='w-4 h-4 fill-accent' />Weakest:</div> <div className='text-accent'>Physics</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full h-1/2">
                <div className="flex w-1/2 h-full">

                </div>
                <div className="flex w-1/2 h-full">

                </div>
            </div>

        </div>
    );
}