import { useEffect, useState } from "react";
import Button from "./Button"
import EmptyButton from "./EmptyButton";
import { getAll } from "../services/buttonService";

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
                btn?.id ? 
                <Button key={index} button={btn} setButtons={setButtons} /> :
                <EmptyButton key={index} />
            ))}
        </div>
    )
}