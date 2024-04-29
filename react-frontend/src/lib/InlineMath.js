import katex from 'katex';

export const renderKaTeX = (inlineMath) => {
    let htmlString = '';
    try {
        htmlString = katex.renderToString(inlineMath, {
            throwOnError: false,
        });
    } catch (error) {
        console.error("KaTeX rendering error:", error);
        htmlString = `<span class="text-red-500">Error rendering equation:</span>`;
    }
    return htmlString;
};
