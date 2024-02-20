import InlineMathPreview from './InlineMathPreview'
import BlockMathPreview from './BlockMathPreview'
const TakeExam = () => {
    return (
        <div className="TakeExam">
            <p className="example">Inline Math Example: </p>
            <InlineMathPreview
                math={"\\int_0^\\infty x^2 dx"}
            />
            <br />
            <p className="example">BLock Math Example: </p>
            <BlockMathPreview math={`\\begin{align*}
        f(x) &= \\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{z-x} dz \\\\
        &= \\sum_{n=0}^\\infty a_n(x-x_0)^n \\\\
        &= a_0 + a_1(x-x_0) + a_2(x-x_0)^2 + \\cdots \\\\
        &= \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n \\\\
        &= e\\end{align*}`} />
        </div>
    );
}

export default TakeExam;