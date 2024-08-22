import { useEffect, useState } from "react";
import { getAll } from "../services/buttonService";
import Slot from "./Slot";

export default function Grid () {
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        getAll().then(data => {
            const setBtns = data.slice(0, 9);
            const emptyBtns = Array(9 - setBtns.length).fill(undefined);
            setButtons([...setBtns, ...emptyBtns]);
        });
    }, []);

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {buttons.map((btn, index) => (
                <Slot key={index} button={btn} setButtons={setButtons} />
            ))}
        </div>
    )
}