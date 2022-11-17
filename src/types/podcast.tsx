export interface Podcast {
    title: string;
    summary: string;
    img: string;
    id: string;
    author: string;
}

export interface PodcastSliceState {
    loading: boolean;
    podcasts: Podcast[];
}

export interface PodcastDetailType {
    id: string;
    summary: string;
    episodes?: PodcastEpisode[];
    episodesNumber?: number;
    lastView?: string;
}

export interface PodcastEpisode {
    id: number;
    title: string;
    date: string;
    duration: string;
    description: string;
    shortDescription: string;
    episodeUrl: string;
    episodeFileExtension: string;
}