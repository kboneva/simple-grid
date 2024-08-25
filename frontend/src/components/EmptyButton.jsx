import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function EmptyButton () {

    return (
        <div className="flex rounded-lg bg-gray-100 justify-center items-center h-full">
            <FontAwesomeIcon icon={faPlus} size="2x" className="text-gray-400" />
        </div>
    )
}