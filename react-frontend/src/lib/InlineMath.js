import 'katex/dist/katex.min.css';
import { Remarkable } from "remarkable";
import rkatex from "remarkable-katex";

export const remarkableKatexRender = (desc) => {
    let LatexRenderer = new Remarkable();
    LatexRenderer.use(rkatex);
    return LatexRenderer.render(desc);
}