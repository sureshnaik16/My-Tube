import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_KEY, views_converter } from '../../../data';
import moment from 'moment';
import './Feed.css';

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  const fetchSearchResults = async () => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`;
      const res = await fetch(url);
      const json = await res.json();

      const videoIds = json.items
        .filter(item => item.id.kind === 'youtube#video')
        .map(item => item.id.videoId)
        .join(',');

      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`;
      const videoRes = await fetch(videoDetailsUrl);
      const videoJson = await videoRes.json();
      setResults(videoJson.items);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className='feed'>
      {results.map((item, index) => (
        <Link key={index} to={`/watch/${item.snippet.categoryId || 0}/${item.id}`} className='card'>
          <img src={item.snippet.thumbnails.medium.url} alt="thumbnail" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {views_converter(item.statistics?.viewCount || 0)} views &bull;{' '}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
