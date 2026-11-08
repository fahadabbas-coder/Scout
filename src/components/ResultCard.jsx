import { useDispatch, useSelector } from 'react-redux'
import { CheckIcon } from '@phosphor-icons/react'
import { addCollection } from '../redux/features/collectionSlice'
import { savedToast } from '../lib/toast'
import MediaCard from './MediaCard'

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()
    const collected = useSelector((state) =>
        state.collection.items.some((collectedItem) => collectedItem.id === item.id)
    )

    const handleSave = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (collected) return
        dispatch(addCollection(item))
        savedToast()
    }

    const saveButton = collected ? (
        <span
            aria-label="Already saved to collection"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1.5 text-xs font-bold text-accent-strong"
        >
            <CheckIcon size={13} weight="bold" aria-hidden="true" />
            Saved
        </span>
    ) : (
        <button
            type="button"
            onClick={handleSave}
            className="shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-ink-deep transition-[transform,background-color] duration-150 ease-out hover:bg-accent-strong active:scale-95"
        >
            Save
        </button>
    )

    return <MediaCard item={item} action={saveButton} />
}

export default ResultCard
