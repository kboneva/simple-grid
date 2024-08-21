import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { Link, useParams } from "react-router-dom";

export default function ButtonForm ({ data, handleSubmit}) {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setColor(data.color);
            setLink(data.link);
        }
        console.log(id);
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        const button = {title, color, link};
        id ? handleSubmit(id, button) : handleSubmit(button);
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <p>{id ? "Edit" : "Create"} a new button</p>
            <div className="flex gap-2">
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div className="flex gap-2">
                <label htmlFor="link">Link</label>
                <input
                    type="url" 
                    value={link} 
                    onChange={e => setLink(e.target.value)} 
                    required 
                />
            </div>
            <div className="flex gap-2">
                <label htmlFor="color">Color</label>
                <input 
                    type="text" 
                    value={color} 
                    onChange={e => setColor(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">{id ? "Edit" : "Add"}</button>
            <Link to={"/"}>Back</Link>
        </form>
    )
}

ButtonForm.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        color: PropTypes.string,
        link: PropTypes.string
    }),
    handleSubmit: PropTypes.func.isRequired
}

ButtonForm.defaultProps = {
    buttonData: null
};