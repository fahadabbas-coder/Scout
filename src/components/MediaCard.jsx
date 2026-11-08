import { PlayIcon, ArrowUpRightIcon } from '@phosphor-icons/react'

/**
 * Shared media tile used by search results and the collection.
 * - Photos/GIFs: lazy-loaded thumbnail, full media opens in a new tab.
 * - Video: poster thumbnail with a play badge; the video file itself is
 *   not fetched until the user leaves for the source (keeps grids light,
 *   no 15-way autoplay).
 * - Aspect ratio is reserved (4:5) so nothing shifts on load (CLS safe).
 *
 * `action` renders the trailing control (Save / Remove).
 */
const MediaCard = ({ item, action }) => {
    return (
        <article className="group relative aspect-4/5 overflow-hidden rounded-xl border border-line bg-surface">
            {item.type === 'videos' ? (
                <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${item.title} on the source site`}
                    className="absolute inset-0"
                >
                    <img
                        src={item.thumb}
                        alt={item.title || 'Video thumbnail'}
                        loading="lazy"
                        decoding="async"
                        className="tile-media h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                    <span
                        aria-hidden="true"
                        className="tile-media absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-deep/70 text-text backdrop-blur-sm transition-transform duration-200 ease-out group-hover:scale-110"
                    >
                        <PlayIcon size={20} weight="fill" />
                    </span>
                </a>
            ) : (
                <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${item.title} in a new tab`}
                    className="absolute inset-0"
                >
                    <img
                        src={item.thumb}
                        alt={item.title || 'Media thumbnail'}
                        loading="lazy"
                        decoding="async"
                        className="tile-media h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                </a>
            )}

            {/* Hover affordance: media opens in a new tab */}
            <span
                aria-hidden="true"
                className="tile-hover-only pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink-deep/70 text-text opacity-0 backdrop-blur-sm transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
            >
                <ArrowUpRightIcon size={15} weight="bold" />
            </span>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-ink-deep/95 via-ink-deep/60 to-transparent px-2.5 pb-2 pt-8">
                <h3
                    className="min-w-0 truncate pr-1 text-xs font-semibold text-text"
                    title={item.title}
                >
                    {item.title || item.type}
                </h3>
                {action}
            </div>
        </article>
    )
}

export default MediaCard
