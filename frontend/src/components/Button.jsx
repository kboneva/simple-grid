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

    const colors = Colors.find(c => c.name === color) || Colors.find(c => c.name === "Gray");
    const color1 = colors.color1;
    const color2 = colors.color2;

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
        <div className='flex flex-row h-full rounded-lg p-2 gap-1 bg-white lg:flex-col'>
            <div className='h-full aspect-square rounded-lg lg:flex-grow lg:aspect-auto' style={{ background: `linear-gradient(to bottom right, ${color2}, ${color1})` }}></div>
            <div className='flex justify-between items-center w-full py-2 px-4'>
                <p className='text-xl text-gray-700 font-semibold lg:text-2xl'>{title}</p>
                <div className='flex flex-row items-center gap-4'>
                    {!link &&
                        <div className='relative'>
                            <FontAwesomeIcon className='icon text-rose-600 text-opacity-50 peer' icon={faChainSlash} />
                            {!dropdown && <span className="tooltip">Link not configured</span>}
                        </div>
                    }
                    <div className='relative' ref={dropdownRef}>
                        <FontAwesomeIcon onClick={(e) => toggleDropdown(e)} className='icon rounded-full text-gray-700 transition-colors duration-200
                            hover:text-slate-800 focus:text-slate-800 hover:bg-indigo-50' icon={faEllipsisV} />
                        {dropdown &&
                            <div className='absolute right-0 z-20 mt-2 p-1 rounded-md bg-white shadow-md flex flex-col ring-1 ring-black ring-opacity-5'>
                                <button className='py-2 px-4 text-sm text-gray-700 transition-colors hover:bg-indigo-50' onClick={e => handleEdit(e)}>Edit</button>
                                <button className='py-2 px-4 text-sm text-gray-700 transition-colors hover:bg-indigo-50' onClick={e => handleDelete(e)}>Delete</button>
                            </div>
                        }
                    </div>
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