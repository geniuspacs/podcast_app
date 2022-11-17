import { createSlice } from "@reduxjs/toolkit";
import { Podcast, PodcastDetailSliceState, PodcastDetailType } from "../../types/podcast";

const initialState: PodcastDetailSliceState = {
    loadingDetail: false,
    podcastViewed: []
};

export const PodcastDetailSlice = createSlice({
    name: 'Podcast',
    initialState,
    reducers: {
        startLoadingPodcastDetail: (state) => ({
            ...state,
            loadingDetail: true
        }),
        stopLoadingPodcastDetail: (state) => ({
            ...state,
            loadingDetail: false
        }),
        setPodcastDetail: (state, action) => ({
            ...state,
            podcastViewed: [...state.podcastViewed, action.payload],
        }),
        setError: (state, action) => ({
            ...state,
            error: action.payload.error
        })
    }
});

export const { startLoadingPodcastDetail, stopLoadingPodcastDetail, setPodcastDetail, setError } = PodcastDetailSlice.actions;