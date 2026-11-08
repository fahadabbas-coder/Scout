import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePages from './pages/HomePages'
import CollectionPage from './pages/CollectionPage'

const App = () => {
    return (
        <div className="flex min-h-dvh flex-col">
            <a href="#main" className="skip-link">Skip to content</a>

            <NavBar />

            <main id="main" className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePages />} />
                    <Route path="/collection" element={<CollectionPage />} />
                </Routes>
            </main>

            <Footer />

            <ToastContainer
                position="bottom-right"
                autoClose={2200}
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
                newestOnTop
                theme="dark"
            />
        </div>
    )
}

export default App
