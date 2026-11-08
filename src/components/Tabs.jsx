import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'

const TABS = ['photos', 'videos', 'gifs']

const TAB_LABELS = {
    photos: 'Photos',
    videos: 'Video',
    gifs: 'GIFs',
}

const Tabs = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.search.activeTab)

    return (
        <div
            role="tablist"
            aria-label="Result type"
            className="inline-flex rounded-full border border-line bg-surface p-1"
        >
            {TABS.map((tab) => {
                const isActive = activeTab === tab
                return (
                    <button
                        key={tab}
                        role="tab"
                        type="button"
                        aria-selected={isActive}
                        onClick={() => dispatch(setActiveTab(tab))}
                        className={[
                            'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150',
                            isActive
                                ? 'bg-accent text-ink-deep'
                                : 'text-muted hover:text-text',
                        ].join(' ')}
                    >
                        {TAB_LABELS[tab]}
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs
