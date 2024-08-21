import { Link } from "react-router-dom"

export default function EmptyButton () {

    return (
        <Link to={"/create"} className='rounded-lg border border-solid border-transparent py-2 px-4 bg-neutral-700'>
            <div className="flex justify-center items-center h-full">
                <p>Empty Button</p>
            </div>
        </Link>
    )
}