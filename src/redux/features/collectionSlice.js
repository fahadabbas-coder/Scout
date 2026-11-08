import { createSlice } from "@reduxjs/toolkit";

// Legacy items (saved before the `thumb` rename) need a one-time migration.
const migrate = (items) =>
    items.map((item) =>
        item.thumb ? item : { ...item, thumb: item.tumbnail || item.src }
    );

const loadInitial = () => {
    try {
        const stored = JSON.parse(localStorage.getItem("collection"));
        return Array.isArray(stored) ? migrate(stored) : [];
    } catch {
        return [];
    }
};

const persist = (items) => {
    localStorage.setItem("collection", JSON.stringify(items));
};

const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        items: loadInitial(),
    },
    reducers: {
        addCollection(state, action) {
            const alreadyExists = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (alreadyExists) return;
            state.items.push(action.payload);
            persist(state.items);
        },
        removeCollection(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            persist(state.items);
        },
        clearCollection(state) {
            state.items = [];
            localStorage.removeItem("collection");
        },
    },
});

export const { addCollection, removeCollection, clearCollection } =
    collectionSlice.actions;

export default collectionSlice.reducer;
