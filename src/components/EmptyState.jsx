import { ImageBrokenIcon, WarningCircleIcon, ArrowsClockwiseIcon } from '@phosphor-icons/react'

const EmptyState = ({
    icon = 'empty',
    title,
    body,
    actionLabel,
    onAction,
}) => {
    const Icon =
        icon === 'error'
            ? WarningCircleIcon
            : icon === 'retry'
              ? ArrowsClockwiseIcon
              : ImageBrokenIcon

    return (
        <div
            role={icon === 'error' ? 'alert' : 'status'}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line py-20 text-center"
        >
            <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-muted"
                aria-hidden="true"
            >
                <Icon size={24} weight="duotone" />
            </span>
            <h2 className="text-lg font-bold text-text">{title}</h2>
            {body && (
                <p className="max-w-[42ch] text-sm leading-relaxed text-muted">
                    {body}
                </p>
            )}
            {onAction && (
                <button
                    type="button"
                    onClick={onAction}
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-ink-deep transition-[transform,background-color] duration-150 ease-out hover:bg-accent-strong active:scale-95"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    )
}

export default EmptyState
