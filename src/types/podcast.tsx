export interface Podcast {
    title: string;
    summary: string;
    img: string;
    id: string;
    author: string;
}

export interface PodcastSliceState {
    loading: boolean;
    items: Podcast[];
}

export interface PodcastDetailSliceState {
    loading: boolean;
    podcastDetail: Podcast | null[];
    error?: string;
}