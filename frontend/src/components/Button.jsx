import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteButton } from '../services/buttonService';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChainSlash, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../constants/colors';

export default function Button({ button, setButtons }) {
    const { id, title, color, link } = button;
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const colors = Colors.find(c => c.name === color);
    const color1 = colors.color1 || Colors.find(c => c.name === "Gray").color1;
    const color2 = colors.color2 || Colors.find(c => c.name === "Gray").color2;

    useEffect(() => {
        const clickOut = (event) => {
            if (!dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        }

        document.addEventListener("mousedown", clickOut);
        return () => {
            document.removeEventListener("mousedown", clickOut);
        }
    }, [dropdown])

    const toggleDropdown = (event) => {
        event.preventDefault();
        setDropdown(state => !state);
    }

    const handleEdit = (event) => {
        event.preventDefault();
        navigate("/edit/" + id);
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await deleteButton(id);
            setButtons(state =>
                state.filter(btn => (btn && btn.id !== id) || !btn)
                    .concat(Array(1).fill(null))
                    .slice(0, 9));
        } catch (error) {
            console.error('Error deleting button:', error);
        }
    }

    return (
        <div className='flex justify-between py-4 px-6 h-full rounded-lg'
            style={{ background: `linear-gradient(to bottom right, ${color2}, ${color1})` }}>
            <p className='text-2xl text-gray-400 mix-blend-difference font-semibold'>{title}</p>
            <div ref={dropdownRef} className=''>
                <div className='flex flex-row gap-4'>
                    {!link &&
                        <span className='relative'>
                            <FontAwesomeIcon className='icon text-gray-400 mix-blend-difference peer' icon={faChainSlash} />
                            {!dropdown && <span className="tooltip">Link not configured</span>}
                        </span>
                    }
                    <button type="button" className='relative' onClick={(e) => toggleDropdown(e)} id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <FontAwesomeIcon className='icon rounded-full text-gray-400 mix-blend-difference transition-colors duration-200
                                              hover:text-slate-900 focus:text-slate-900 hover:bg-gray-400 hover:bg-opacity-50 hover:bg-blend-screen' icon={faEllipsisV} />
                        {dropdown &&
                            <div className='absolute right-0 z-20 mt-2 p-1 rounded-md bg-white shadow-md flex flex-col ring-1 ring-black ring-opacity-5'>
                                <button className='py-2 px-4 text-sm text-gray-700 transition-colors hover:bg-indigo-50' onClick={e => handleEdit(e)}>Edit</button>
                                <button className='py-2 px-4 text-sm text-gray-700 transition-colors hover:bg-indigo-50' onClick={e => handleDelete(e)}>Delete</button>
                            </div>
                    }
                    </button>
                </div>
            </div>
        </div>
    )
}

Button.propTypes = {
    button: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        color: PropTypes.string,
        link: PropTypes.string
    }),
    setButtons: PropTypes.func
}