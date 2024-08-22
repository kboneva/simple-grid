import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import Button from './Button';
import EmptyButton from './EmptyButton';

export default function Slot({ button, setButtons }) {

    if (button) {
        const { id, link } = button;
        if (link) {
            return(
                <a href={link} 
                target="_blank" rel="noopener noreferrer"
                className='min-h-40 min-w-80 rounded-lg outline outline-transparent bg-neutral-700'>
                    <Button button={button} setButtons={setButtons} />
                </a>
            )
        }
        else {
            return(
                <Link 
                to={`/edit/${id}`}
                className='min-h-40 min-w-80 rounded-lg outline outline-transparent bg-neutral-700'>
                    <Button button={button} setButtons={setButtons} />
                </Link>
            )
        }
    }
    else {
        return (
            <Link 
            to={'/create'}
            className='min-h-40 min-w-80 rounded-lg outline outline-transparent bg-neutral-700'>
                <EmptyButton />
            </Link>
        )
    }
}

Slot.propTypes = {
    button: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        color: PropTypes.string,
        link: PropTypes.string
    }),
    setButtons: PropTypes.func
}