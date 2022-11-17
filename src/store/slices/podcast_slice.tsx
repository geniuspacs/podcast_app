import { createSlice } from "@reduxjs/toolkit";
import { Podcast, PodcastSliceState } from "../../types/podcast";

const initialState: PodcastSliceState = {
    loading: false,
    podcasts: []
};

export const PodcastSlice = createSlice({
    name: 'Podcast',
    initialState,
    reducers: {
        startLoading: (state) => ({
            ...state,
            loading: true
        }),
        stopLoading: (state) => ({
            ...state,
            loading: false
        }),
        setSelectedPodcast: (state, action) => ({
            ...state,
            podcasts: [...state.podcasts, action.payload]
        }),
        setError: (state, action) => ({
            ...state,
            error: action.payload.error
        })
    }
});

export const { startLoading, stopLoading, setSelectedPodcast, setError } = PodcastSlice.actions;