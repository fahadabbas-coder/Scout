import { useDispatch } from 'react-redux'
import { removeCollection } from '../redux/features/collectionSlice'
import { removedToast } from '../lib/toast'
import MediaCard from './MediaCard'

const CollectionCard = ({ item }) => {
    const dispatch = useDispatch()

    const handleRemove = (event) => {
        event.preventDefault()
        event.stopPropagation()
        dispatch(removeCollection(item))
        removedToast()
    }

    const removeButton = (
        <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${item.title || 'item'} from collection`}
            className="shrink-0 rounded-full bg-raised/90 px-3 py-1.5 text-xs font-bold text-text transition-[transform,background-color] duration-150 ease-out hover:bg-danger hover:text-ink-deep active:scale-95"
        >
            Remove
        </button>
    )

    return <MediaCard item={item} action={removeButton} />
}

export default CollectionCard
