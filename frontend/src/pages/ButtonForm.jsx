import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { Link, useParams } from "react-router-dom";
import { Colors } from "../constants/colors";

export default function ButtonForm ({ data, handleSubmit}) {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [link, setLink] = useState(''); // TODO set data?.something here || ''

    useEffect(() => {
        if (data) {
            setTitle(data.title || '');
            setColor(data.color || '');
            setLink(data.link || '');
        }
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        const button = {title, color, link};
        id ? handleSubmit(id, button) : handleSubmit(button); // TODO fix handleSubmit
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
                />
            </div>
            <div className="flex gap-2">
                <label htmlFor="color">Color</label>
                <select 
                    value={color} 
                    onChange={e => setColor(e.target.value)}
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"  
                >
                    <option value="" disabled>Select a color</option>
                    {Object.entries(Colors).map(([name, value]) => (
                        <option key={name} value={value}>
                            {name}
                        </option>
                    ))}
                </select>
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