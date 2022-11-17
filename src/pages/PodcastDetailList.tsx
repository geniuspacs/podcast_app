import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EpisodesList } from '../components';
import { PodcastDetailType } from '../types/podcast';
import { getPodcastDetail } from '../store/slices/thunks';

export const PodcastDetailList = () => {

    const {loading, podcasts} = useSelector((state: any) => state.details);

    const { podcastId } = useParams();

  return (
    <>
        {
            !loading && podcasts?.length > 0 && podcasts.find((podcast: PodcastDetailType) => podcast.id === podcastId) &&
            <EpisodesList podcast_detail={podcasts?.find((podcast: PodcastDetailType) => podcast.id === podcastId)}/>
        }
    </>
  )
}
