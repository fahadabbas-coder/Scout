import axios from "axios"

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY

/**
 * All fetchers accept an AbortSignal so in-flight requests can be
 * cancelled when the user changes query or tab (avoids stale data
 * overwriting fresh results).
 */
export async function fetchPhotos(query, page = 1, perPage = 15, signal) {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query, page, per_page: perPage },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
        signal,
    })
    return response.data.results || []
}

export async function fetchVideos(query, perPage = 15, signal) {
    const response = await axios.get("https://api.pexels.com/v1/videos/search", {
        params: { query, per_page: perPage },
        headers: { Authorization: PEXELS_KEY },
        signal,
    })
    return response.data
}

export async function fetchGif(query, limit = 15, signal) {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
            api_key: GIPHY_KEY,
            q: query,
            limit,
        },
        signal,
    })
    return response.data
}
