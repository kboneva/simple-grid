import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteButton } from '../services/buttonService';

export default function Button({ button, setButtons }) {
    const { id, title, color, link } = button;
    const navigate = useNavigate();

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
        <a href={link} 
            target="_blank" rel="noopener noreferrer" 
            className='rounded-lg outline outline-transparent overflow-hidden bg-neutral-700'>
            <div className='w-full h-2 my-0' style={{ backgroundColor: color }}></div>
            <div className='py-2 px-4 flex flex-col gap-2'>
                <div className='text-white'>
                    <span>{title} </span>
                </div>
                <div>
                    <button onClick={e => handleEdit(e)}>Edit</button>
                    <button onClick={e => handleDelete(e)}>Delete</button>
                </div>
            </div>
        </a>
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