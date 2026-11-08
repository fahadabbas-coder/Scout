const SKELETON_CELLS = Array.from({ length: 12 }, (_, index) => index)

/**
 * Shape-matched loading state: mirrors the final grid layout exactly
 * (same aspect ratio, same radius) so the page does not jump when
 * results arrive.
 */
const SkeletonGrid = ({ count = SKELETON_CELLS.length }) => (
    <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label="Loading results"
    >
        {SKELETON_CELLS.slice(0, count).map((index) => (
            <div
                key={index}
                className="relative aspect-4/5 overflow-hidden rounded-xl border border-line bg-surface"
            >
                <span className="skeleton-shimmer" aria-hidden="true" />
            </div>
        ))}
    </div>
)

export default SkeletonGrid
