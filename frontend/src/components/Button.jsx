import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteButton } from '../services/buttonService';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../constants/colors';

export default function Button({ button, setButtons }) {
    const { id, title, color } = button;
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();

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
        <>
            <div className='w-full rounded-t-lg h-4 my-0' style={{ backgroundColor: color || Colors.Gray }}></div>
            <div className='py-2 px-4 flex flex-row justify-between'>
                <div className='text-white'>
                    <span>{title} </span>
                </div>
                <div className='relative'>
                    <button type="button" onClick={(e) => toggleDropdown(e)} className="justify-center rounded-full bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                    {dropdown && 
                    <div className='absolute right-0 mt-2 z-10 flex flex-col bg-neutral-500 origin-top-right'>
                        <button onClick={e => handleEdit(e)}>Edit</button>
                        <button onClick={e => handleDelete(e)}>Delete</button>
                    </div>
                    }
                </div>
            </div>
        </>
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