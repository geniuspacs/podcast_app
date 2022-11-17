import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PodcastToolbar } from '../components';
import { PodcastListProvider } from '../providers/PodcastListProvider';
import { Podcast } from '../types/podcast';

const linkStyle: CSSProperties = {
    textDecoration: 'none',
    position: 'relative',
    textAlign: 'center'
}

export const PodcastDirectory = () => {

    const { loading, podcastList } = useContext(PodcastListProvider);

    const [filter, setFilter] = useState<string>('');
    const [podcastFiltered, setPodcastFiltered] = useState<Podcast[]>([]);

    useEffect(() => {
      if(filter) {
        const filtered = podcastList.filter(
          (podcast: Podcast) => 
          podcast.title.toLowerCase().includes(filter.toLocaleLowerCase()) || podcast.author.toLowerCase().includes(filter.toLowerCase()));

          setPodcastFiltered(filtered)
      } else {
        setPodcastFiltered(podcastList);
      }
    }, [filter])
    

  return (
    <div className="App">
      {
        !loading && 
        <>
          <PodcastToolbar filter={filter} onSetFilter={(value: string) => setFilter(value)}></PodcastToolbar>
          {
            podcastFiltered.length <= 0 && <h1>Podcasts not found 😢</h1>
          }

          {
            podcastFiltered.length > 0 &&
            <>
              <div className='mt-2 grid flex flex-wrap align-items-stretch row-gap-1'>
                {podcastFiltered.map((podcast: Podcast, index: number) => (
                  <Link
                  key={index}
                  to={`podcast/${podcast.id}`}
                  style={linkStyle} className="col md:col-3 align-items-stretch">
                    <Card>
                      <div className="p-card-title col" style={{fontSize: '1rem', textAlign: 'center'}}>
                        <Avatar image={podcast.img} size='xlarge' shape='circle' />
                        <div>
                          {podcast.title}
                        </div>
                      </div>

                      <div className="p-card-subtitle">
                        {podcast.author}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          }
        </>
      }

      
    </div>
  )
}
