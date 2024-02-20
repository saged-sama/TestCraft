import 'katex/dist/katex.min.css';
import { useState, useEffect } from 'react';
import katex from 'katex';

const MathPreview = ({ inlineMath }) => {
    const [html, setHtml] = useState("");

    useEffect(() => {
        let htmlString = '';
        try {
            htmlString = katex.renderToString(inlineMath, {
                throwOnError: false,
            });
        } catch (error) {
            console.error("KaTeX rendering error:", error);
            htmlString = `<span class="text-red-500">Error rendering equation:</span>`;
        }
        setHtml(htmlString);
    }, [inlineMath]);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const InlineMathPreview = ({ math }) => {
    return (
        <div>
            <MathPreview inlineMath={math} />
        </div>
    );
}

export default InlineMathPreview;
