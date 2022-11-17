import axios from "axios";
import { Podcast, PodcastEpisode } from "../../types/podcast";
import { setError, setSelectedPodcast, startLoading, stopLoading } from "./podcast_slice";

export const getPodcastDetail = (id: string): any => {
    return async(dispatch: any, getState: Function) => {
        const {details} = getState();

        const {podcasts} = details;

        const existingPodcast = podcasts.find((podcast: Podcast) => podcast.id === id);
        

        if(!existingPodcast) {
            dispatch(startLoading());

            try {
                const { data } = await axios.get(import.meta.env.VITE_PODCAST_DETAIL_BASE, {
                    params: {
                        url: `${import.meta.env.VITE_PODCAST_DETAIL}?id=${id}&media=podcast&entity=podcastEpisode&limit=100`
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                dispatch(setSelectedPodcast({
                    id,
                    episodes: data.results
                        .filter((podc: any) => podc.kind === 'podcast-episode')
                        .map((episode: any): PodcastEpisode => (
                            {
                                id: episode.trackId,
                                title: episode.trackName,
                                date: episode.releaseDate,
                                duration: episode.trackTimeMillis,
                                description: episode.description,
                                shortDescription: episode.shortDescription,
                                episodeUrl: episode.episodeUrl,
                                episodeFileExtension: episode.episodeFileExtension
                            }
                        )
                    ),
                    episodesNumber: data.resultCount - 1
                }));
            } catch (error) {
                dispatch(setError({error}))
            }

            dispatch(stopLoading());
        }
    }
}