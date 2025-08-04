import React, { useEffect, useState } from 'react';
import "./Recommended.css";
import { API_KEY, views_converter } from '../../../data';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Recommended = ({categoryId}) => {
    const [apiData, setApiData] = useState([]);
    const fetchData = async () => {
        const relatedVideo_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=45&videoCategoryId=${categoryId}&key=${API_KEY}`;
        try{
            const relatedRes = await fetch(relatedVideo_Url);
            const relatedJson = await relatedRes.json();
            setApiData(relatedJson.items);
        }
        catch(error){
            console.error("Error fetching recommended details", error);
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);
  return (
    <div className='recommended'>
        {apiData.map((item, index)=>{
            return(
                <Link to={`/watch/${item.snippet.categoryId}/${item.id}`} key={index} className='side-video-list'>
                    <img src={item.snippet.thumbnails.medium.url} alt='thumbnail'/>
                    <div className='vid-info'>
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{views_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </div>
                </Link>
            )
        })};
    </div>
  )
};

export default Recommended;