import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TrashIcon } from '@phosphor-icons/react'
import CollectionCard from '../components/CollectionCard'
import EmptyState from '../components/EmptyState'
import { clearCollection } from '../redux/features/collectionSlice'
import { clearedToast } from '../lib/toast'

const CollectionPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const items = useSelector((state) => state.collection.items)
    const hasItems = items.length > 0

    const handleClear = () => {
        if (!window.confirm('Remove all saved items from your collection?')) {
            return
        }
        dispatch(clearCollection())
        clearedToast()
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
            <header className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-text">
                        Collection
                    </h1>
                    <p
                        className="mt-1 text-sm font-medium text-muted"
                        aria-live="polite"
                    >
                        {hasItems
                            ? `${items.length} saved item${items.length === 1 ? '' : 's'}`
                            : 'Nothing saved yet'}
                    </p>
                </div>
                {hasItems && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-muted transition-colors duration-150 hover:border-danger hover:bg-danger hover:text-ink-deep active:scale-95"
                    >
                        <TrashIcon size={16} weight="bold" aria-hidden="true" />
                        Clear all
                    </button>
                )}
            </header>

            <div className="mt-6">
                {hasItems ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                        {items.map((item) => (
                            <CollectionCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Your collection is empty"
                        body="Save photos, video, and GIFs from search results and they will show up here."
                        actionLabel="Search media"
                        onAction={() => navigate('/')}
                    />
                )}
            </div>
        </div>
    )
}

export default CollectionPage
