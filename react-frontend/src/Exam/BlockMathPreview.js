import 'katex/dist/katex.min.css';
import { useState, useEffect } from 'react';
import katex from 'katex';

const MathPreview = ({ blockMath }) => {
    const [html, setHtml] = useState("");

    useEffect(() => {
        let htmlString = '';
        try {
            htmlString = katex.renderToString(blockMath, {
                throwOnError: false,
                displayMode: true,
            });
        } catch (error) {
            console.error("KaTeX rendering error:", error);
            htmlString = `<span class="text-red-500">Error rendering equation:</span>`;
        }
        setHtml(htmlString);
    }, [blockMath]);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const BlockMathPreview = ({ math }) => { 
    return (
        <div>
            <MathPreview blockMath={math} />
        </div>
    );
}

export default BlockMathPreview;
