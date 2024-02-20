import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>TestCraft</h1>
            <div className="link">
                <Link to='/'>Home</Link>
                <a href="/Create-Exam">Create Exam</a>
                <a href="Take-Exam">Take Exam</a>
            </div>
        </nav>
    );
}

export default Navbar;