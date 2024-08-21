import { useParams } from "react-router-dom";

export const ButtonPage = () => {
    const { id } = useParams();

    return (
        <>
            <p>Button with id: {id}</p>
        </>
    )
}