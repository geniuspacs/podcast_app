export interface Podcast {
    title: string;
    summary: string;
    img: string;
    id: string;
    author: string;
}

export interface PodcastEpisode {
    id: string;
    title: string;
    date: string;
    duration: string;
}

export interface PodcastDetailType {
    id: string;
    summary: string;
    episodes?: PodcastEpisode[];
    episodesNumber?: number;
    lastView?: Date;
}

export interface PodcastSliceState {
    loadingList: boolean;
    items: Podcast[];
    error?: string;
}

export interface PodcastDetailSliceState {
    loadingDetail: boolean;
    podcastViewed: PodcastDetailType[]
}