import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Podcast, PodcastDetailType, PodcastEpisode } from '../types/podcast';

export const PodcastPlayer = () => {

  const dispatch = useDispatch();

  const [episodeSelected, setEpisodeSelected] = useState<PodcastEpisode>();

    const { podcasts } = useSelector((state: any) => state.details);

    const { podcastId, episodeId } = useParams();
    

  useEffect(() => {
    if(podcastId && episodeId) {
      const podcastSelected: PodcastDetailType = podcasts.find((podcast: PodcastDetailType) => podcast.id === podcastId);

      const episode: PodcastEpisode | undefined = podcastSelected?.episodes?.find((episode) => episode.id === parseInt(episodeId));

      setEpisodeSelected(episode);
    }

  }, [podcastId, episodeId]);

  return (
    <>
      {
        episodeSelected &&
        <Card title={episodeSelected.title} subTitle={episodeSelected.description}>
          <audio className="col-12" controls>
            <source src={episodeSelected.episodeUrl} type={`audio/${episodeSelected.episodeFileExtension}`} />
          </audio>
        </Card>
      }
    </>
  )
}
