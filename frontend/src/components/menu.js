import { useNavigate } from 'react-router-dom';
import './menu.css';
import home from '../images/home.svg';
import library from '../images/library.svg';


const Menu = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    };

    const handleLibrary = () => {
        navigate('/library');
    };

    return (
        <div className="menu">
            {/* Home button */}
            <button onClick={handleHome} className="home-button">
                <img src={home} alt="home" className="home-img" />
                <span className="button-label">Home</span>
            </button>
            {/* Library button */}
            <button onClick={handleLibrary} className="library-button">
                <img src={library} alt="library" className="library-img" />
                <span className="button-label">My Library</span>
            </button>
        </div>
    );
}


export default Menu;