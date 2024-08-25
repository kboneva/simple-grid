import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { Link, replace, useNavigate, useParams } from "react-router-dom";
import { Colors } from "../constants/colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { createButton, editButton, getButton, isMaxButtonsCount } from "../services/buttonService";
import Spinner from "../components/Spinner";

export default function ButtonForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            try {
                getButton(id).then(data => {
                    setTitle(data.title || '');
                    setColor(data.color || '');
                    setLink(data.link || '');
                }).then(() => setLoading(false));
            } catch (error) {
                console.error('Error fetching button:', error);
            }
        }
        else {
            isMaxButtonsCount()
                .then(isMax => isMax ? navigate('/', replace) : setLoading(false))
        }
    }, [id])

    const onSubmit = (event) => {
        event.preventDefault();
        const button = {
            title,
            color: color || null,
            link: link || null
        };
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

    return (loading ? <Spinner /> :
        <form onSubmit={onSubmit}
            className="w-full max-w-screen-sm ml-auto mr-auto p-16 
                       flex justify-center flex-col gap-8
                       rounded-3xl ring-1 ring-inset ring-indigo-400">
            <p className="font-semibold text-lg text-center mb-2">{id ? "Edit current " : "Create a new "}button</p>
            <div className="flex flex-col gap-2">
                <label className="font-medium text-sm" htmlFor="title">Title</label>
                <input
                    className="input"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium text-sm" htmlFor="link">Link</label>
                <input
                    className="input"
                    type="url"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium text-sm" htmlFor="color">Color</label>
                <select
                    className="input"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                >
                    <option value="">Select a color</option>
                    {Colors.map(color => (
                        <option key={color.name} value={color.name}>
                            <span>{color.name}</span>
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn" type="submit">{id ? "Save" : "Add"}</button>
            <Link className="link flex items-center gap-2" to={"/"}>
                <FontAwesomeIcon className="" icon={faArrowLeftLong} />
                <span>Back</span>
            </Link>
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