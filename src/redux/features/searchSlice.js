import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: "",
        activeTab: "photos",
        results: [],
        loading: false,
        error: null,
        // Bumped to re-run a failed fetch without re-dispatching the query
        refresh: 0,
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload
            state.results = []
            state.error = null
        },
        setActiveTab(state, action) {
            state.activeTab = action.payload
            state.results = []
            state.error = null
        },
        setResults(state, action) {
            state.results = action.payload
            state.loading = false
        },
        setLoading(state) {
            state.loading = true
            state.error = null
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false
        },
        clearResults(state) {
            state.results = []
        },
        requestRefresh(state) {
            state.refresh += 1
        },
    }
})

export const {
    setQuery,
    setActiveTab,
    setResults,
    setLoading,
    setError,
    clearResults,
    requestRefresh,
} = searchSlice.actions

export default searchSlice.reducer
