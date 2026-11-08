import { ImageIcon, PlayIcon, ImagesIcon } from '@phosphor-icons/react'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'
const SUGGESTIONS = ['mountains', 'city lights', 'ocean', 'forests']
const RESULTS_META = {
    photos: { icon: ImageIcon, label: 'photos' },
    videos: { icon: PlayIcon, label: 'videos' },
    gifs: { icon: ImagesIcon, label: 'GIFs' },
}
const HomePages = () => {
    const dispatch = useDispatch()
    const { query, activeTab, results, loading } = useSelector(
        (state) => state.search
    )
    const hasSearched = query !== ''
    const meta = RESULTS_META[activeTab]
    const handleSuggestion = (suggestion) => {
        dispatch(setQuery(suggestion))
    }
    return (
        <>
            {!hasSearched ? (
                <section
                    aria-label="Search intro"
                    className="mx-auto w-full max-w-3xl animate-rise px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24"
                >
                    <h1 className="mx-auto max-w-[18ch] text-4xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-5xl">
                        Find media that feels right.
                    </h1>
                    <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
                        Search photos, video, and GIFs from Unsplash, Pexels,
                        and Giphy. Save the best to your collection.
                    </p>
                    <div className="mt-8">
                        <SearchBar />
                    </div>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        <span className="text-sm font-semibold text-faint">
                            Try
                        </span>
                        {SUGGESTIONS.map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => handleSuggestion(suggestion)}
                                className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:border-accent hover:text-text"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </section>
            ) : (
                <>
                    <section
                        aria-label="Search"
                        className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="w-full sm:max-w-md">
                                <SearchBar />
                            </div>
                            <Tabs />
                        </div>
                    </section>
                    <section
                        aria-label={`Search results for ${query}`}
                        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"
                    >
                        {!loading && results.length > 0 && (
                            <p
                                className="mb-4 flex items-center gap-2 text-sm font-medium text-muted"
                                aria-live="polite"
                            >
                                <meta.icon
                                    size={16}
                                    weight="duotone"
                                    aria-hidden="true"
                                    className="text-accent"
                                />
                                {results.length} {meta.label} for
                                <span className="font-bold text-text">
                                    {query}
                                </span>
                            </p>
                        )}
                        <ResultGrid />
                    </section>
                </>
            )}
        </>
    )
}
export default HomePages