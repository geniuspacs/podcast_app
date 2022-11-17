import React, { Context, createContext, Dispatch, SetStateAction } from 'react';
import { Podcast } from '../types/podcast';

interface PodcastListProviderType {
    podcastList: Podcast[];
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const PodcastListProvider: Context<PodcastListProviderType> = createContext<PodcastListProviderType>({
    loading: false,
    podcastList: [],
    setLoading: () => {}
});