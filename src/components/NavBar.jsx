import { Link, NavLink } from 'react-router-dom'
import { SquaresFourIcon } from '@phosphor-icons/react'
import { useSelector } from 'react-redux'

const NAV_LINKS = [
    { to: '/', label: 'Search', end: true },
    { to: '/collection', label: 'Collection' },
]

const linkClasses = ({ isActive }) =>
    [
        'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150',
        isActive
            ? 'bg-accent text-ink-deep'
            : 'text-muted hover:bg-surface hover:text-text',
    ].join(' ')

const NavBar = () => {
    const collectionCount = useSelector((state) => state.collection.items.length)

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-ink-deep/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link
                    to="/"
                    className="flex items-center gap-2.5 rounded-full"
                    aria-label="Scout home"
                >
                    <SquaresFourIcon
                        size={22}
                        weight="fill"
                        className="text-accent"
                        aria-hidden="true"
                    />
                    <span className="text-lg font-extrabold tracking-tight">
                        Scout
                    </span>
                </Link>

                <nav aria-label="Primary">
                    <ul className="flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    end={link.end}
                                    className={linkClasses}
                                >
                                    {link.label}
                                    {link.to === '/collection' && (
                                        <span
                                            className="ml-1.5 inline-block min-w-1.25rem rounded-full bg-raised px-1.5 py-0.5 text-xs font-bold tabular-nums text-current"
                                            aria-label={`${collectionCount} saved items`}
                                        >
                                            {collectionCount}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NavBar
