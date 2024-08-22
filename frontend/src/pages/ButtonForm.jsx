import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Colors } from "../constants/colors";
import { createButton, editButton, getButton } from "../services/buttonService";

export default function ButtonForm () {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if ( id ) {
            getButton(id).then(data => {
                setTitle(data.title || '');
                setColor(data.color || '');
                setLink(data.link || '');
            });
        }
    }, [id])

    const onSubmit = (event) => {
        event.preventDefault();
        const button = {
            title, 
            color: color || null, 
            link: link || null};
        id ? handleEdit(id, button) : handleCreate(button);
    }

    const handleCreate = async (button) => {
		try {
			await createButton(button);
			navigate('/');
		} catch (error) {
			console.error('Error creating button:', error);
		}
	}

	const handleEdit = async (id, button) => {
		try {
			await editButton(id, button);
			navigate('/');
		} catch (error) {
			console.error('Error updating button:', error);
		}
	}

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <p>{id ? "Edit current " : "Create a new "}button</p>
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
            <button type="submit">{id ? "Save" : "Add"}</button>
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