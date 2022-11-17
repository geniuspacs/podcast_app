import { CSSProperties, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Podcast } from './types/podcast';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Link, Outlet } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner'
import { PodcastListProvider } from './providers/PodcastListProvider';
import axios from 'axios';

export const App = (): JSX.Element => {

  const [podcastList, setPodcastList] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPodcastList = async() => {
    setLoading(true);
    
    const {data} = await axios.get(import.meta.env.VITE_PODCAST_LIST_URL);

    const podcastListFromApi = data.feed.entry.map((podcast: any): Podcast => ({
      id: podcast.id.attributes['im:id'],
      title: podcast.title.label,
      summary: podcast.summary.label,
      img: podcast['im:image'][podcast['im:image'].length-1].label,
      author: podcast['im:artist'].label
    }))

    setPodcastList(podcastListFromApi);
    setLoading(false);
  }

  useEffect(() => {
    if(!podcastList || podcastList.length <= 0) {
      getPodcastList();
    }

  }, []);

  return (
    <PodcastListProvider.Provider value={{
      loading,
      podcastList,
      setLoading
    }}>
      {
        loading && <ProgressSpinner />
      }
      {
        !loading && <Outlet />
      }
    </PodcastListProvider.Provider>
  );
}

export default App
