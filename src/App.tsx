import { CSSProperties, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPodcasts } from './store/slices/thunks';
import { Podcast } from './types/podcast';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Link } from 'react-router-dom';
import { resetPodcastDetail } from './store/slices';

const linkStyle: CSSProperties = {
  textDecoration: 'none',
  position: 'relative',
  textAlign: 'center'
}

export const App = (): JSX.Element => {
  const dispatch = useDispatch();

  const { loading, items } = useSelector((state: any) => state.podcasts);
  const { podcastDetail } = useSelector((state: any) => state.podcast);

  useEffect(() => {
    dispatch(getPodcasts());
    if(podcastDetail) {
      dispatch(resetPodcastDetail());
    }
  }, [])
  

  return (
    <div className="App">
      {
        loading && <h1>Loading...</h1>
      }

      {
        !loading && items.length <= 0 && <h1>Items not found 😢</h1>
      }

      {
        !loading && items.length > 0 && 
        <div className='grid flex flex-wrap align-items-stretch row-gap-1'>
          {items.map((podcast: Podcast, index: number) => (
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
      }
    </div>
  )
}

export default App
