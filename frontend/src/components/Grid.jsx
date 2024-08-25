import { useEffect, useState } from "react";
import { getAll } from "../services/buttonService";
import Slot from "./Slot";
import Spinner from "./Spinner";

export default function Grid() {
    const [buttons, setButtons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            getAll().then(data => {
                const setBtns = data.slice(0, 9);
                const emptyBtns = Array(9 - setBtns.length).fill(undefined);
                setButtons([...setBtns, ...emptyBtns]);
            }).then(() => setLoading(false));
        } catch (error) {
            console.error('Error fetching buttons:', error);
        }
    }, []);

    return (loading ? <Spinner /> :
        <div className="grid p-8 gap-4 grid-cols-1 grid-rows-9 lg:grid-cols-3 lg:grid-rows-3 lg:gap-8">
            {buttons.map((btn, index) => (
                <Slot key={index} button={btn} setButtons={setButtons} />
            ))}
        </div>
    )
}