import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos, fetchGif } from '../api/mediaApi'
import { setResults, setLoading, setError, requestRefresh, } from '../redux/features/searchSlice'
import ResultCard from './ResultCard'
import SkeletonGrid from './SkeletonGrid'
import EmptyState from './EmptyState'

const normalize = {
    photos: (items) =>
        (items || []).map((item) => ({
            id: item.id,
            type: 'photos',
            title: item.alt_description || 'Photo',
            thumb: item.urls.small,
            src: item.urls.regular,
            url: item.links?.html || item.urls.thumb,
        })),
    videos: (payload) =>
        (payload?.videos || []).map((item) => ({
            id: item.id,
            type: 'videos',
            title: item.user?.name || 'Video',
            thumb: item.image,
            src:
                item.video_files?.find((file) => file.quality === 'sd')
                    ?.link ||
                item.video_files?.[0]?.link,
            url: item.url,
        })),
    gifs: (payload) =>
        (payload?.data || []).map((item) => ({
            id: item.id,
            type: 'gifs',
            title: item.title || 'GIF',
            thumb:
                item.images?.fixed_height_small?.url ||
                item.images?.original?.url,
            src: item.images?.original?.url,
            url: item.url,
        })),
}

const FETCHERS = {
    photos: (query, signal) => fetchPhotos(query, 1, 15, signal),
    videos: (query, signal) => fetchVideos(query, 15, signal),
    gifs: (query, signal) => fetchGif(query, 15, signal),
}

const MAX_STAGGER_INDEX = 15
const STAGGER_STEP_MS = 40

const ResultGrid = () => {
    const dispatch = useDispatch()
    const { query, activeTab, results, loading, error, refresh } =
        useSelector((store) => store.search)

    useEffect(() => {
        if (!query) return

        const controller = new AbortController()

        const getData = async () => {
            try {
                dispatch(setLoading())
                const fetcher = FETCHERS[activeTab]
                const response = await fetcher(query, controller.signal)
                dispatch(setResults(normalize[activeTab](response)))
            } catch (err) {
                // Request cancelled by a newer search: ignore the error.
                if (controller.signal.aborted) return
                console.error('Search error:', err)
                dispatch(
                    setError(
                        err?.message ||
                            'Something went wrong while searching. Try again.'
                    )
                )
            }
        }

        getData()

        return () => controller.abort()
    }, [query, activeTab, refresh, dispatch])

    // Stagger only the first screen of results; later items appear instantly.
    const cardStyles = useMemo(
        () =>
            results.map((_, index) => ({
                animationDelay: `${Math.min(index, MAX_STAGGER_INDEX) * STAGGER_STEP_MS}ms`,
            })),
        [results]
    )

    if (error) {
        return (
            <EmptyState
                icon="error"
                title="Search failed"
                body="The media service could not be reached. Check your connection and try again."
                actionLabel="Try again"
                onAction={() => dispatch(requestRefresh())}
            />
        )
    }

    if (loading) {
        return <SkeletonGrid />
    }

    if (results.length === 0) {
        return (
            <EmptyState
                title={`No ${activeTab} found`}
                body={`Nothing matched "${query}". Try a different term or another tab.`}
            />
        )
    }

    return (
        <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
            role="list"
            aria-label="Search results"
        >
            {results.map((item, index) => (
                <div
                    key={item.id}
                    role="listitem"
                    className="animate-rise"
                    style={cardStyles[index]}
                >
                    <ResultCard item={item} />
                </div>
            ))}
        </div>
    )
}

export default ResultGrid
