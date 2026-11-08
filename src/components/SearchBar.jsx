import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const inputRef = useRef(null)

    // Press "/" to focus search from anywhere
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key !== '/') return
            const target = event.target
            if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement
            ) {
                return
            }
            event.preventDefault()
            inputRef.current?.focus()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const submittedHandler = (event) => {
        event.preventDefault()
        const query = text.trim()
        if (!query) return
        dispatch(setQuery(query))
        setText('')
        inputRef.current?.blur()
    }

    return (
        <form
            role="search"
            onSubmit={submittedHandler}
            aria-label="Media search"
            className="relative"
        >
            <label
                htmlFor="media-search"
                className="sr-only"
            >
                Search photos, videos, and GIFs
            </label>

            <MagnifyingGlassIcon
                size={20}
                weight="bold"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
                aria-hidden="true"
            />

            <input
                ref={inputRef}
                id="media-search"
                type="search"
                required
                autoComplete="off"
                spellCheck={false}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Search photos, video, and GIFs"
                className="w-full rounded-full border border-line bg-surface py-3.5 pl-11 pr-28 text-base text-text placeholder:text-faint transition-colors duration-150 focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />

            <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-2">
                <kbd
                    className="hidden rounded-md border border-line bg-ink-deep px-1.5 py-0.5 text-xs font-semibold text-faint sm:block"
                    aria-hidden="true"
                >
                    /
                </kbd>
                <button
                    type="submit"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-ink-deep transition-[transform,background-color] duration-150 ease-out hover:bg-accent-strong active:scale-95"
                >
                    Search
                </button>
            </div>
        </form>
    )
}

export default SearchBar
