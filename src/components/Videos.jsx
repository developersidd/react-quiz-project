import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useVideosList from '../Hooks/useVideosList';
import Video from './Video';

const Videos = () => {

  const [StartingNumber, setStartingNumber] = useState(1);
  const { videos, loading, error, hasMore } = useVideosList(StartingNumber);
  return (

    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          loader={<div> ...Loading </div>}
          next={() => setStartingNumber(StartingNumber + 8)}
        >
          {
            videos.map(({ title, noq, youtubeID }) =>
              (<Video title={title} key={Math.random()} youtubeId={youtubeID} noq={noq} />))
          }
        </InfiniteScroll>
      )}
      
      {loading && <div> ...Loading </div>}
      {(!loading && videos.length === 0) && <div> Videos Not Found! </div>}
      {error && <div> There was an Error! </div>}

    </div>
  )
}

export default Videos;