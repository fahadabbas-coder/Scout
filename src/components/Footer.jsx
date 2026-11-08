import { SquaresFourIcon } from '@phosphor-icons/react'

const Footer = () => (
    <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-faint sm:flex-row sm:px-6">
            <p className="flex items-center gap-2 font-semibold">
                <SquaresFourIcon
                    size={16}
                    weight="fill"
                    className="text-accent"
                    aria-hidden="true"
                />
                Scout
            </p>
            <p>Media by Unsplash, Pexels, and Giphy.</p>
        </div>
    </footer>
)

export default Footer
