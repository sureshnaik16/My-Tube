import React, { useEffect, useState } from 'react'
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, views_converter } from '../../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
    const {videoId} = useParams();
    const [apiData, setApiData]=useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState(null);

    const fetchVideoData = async () => {
        const videoDetails_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        try {
            const videoRes = await fetch(videoDetails_Url);
            const videoJson = await videoRes.json();
            setApiData(videoJson.items[0]);
        } catch (error) {
            console.error("Error fetching video details", error);
        }
    }

    const fetchOtherData = async () => {
        if (!apiData || !apiData.snippet) return;
        try {
            const channelData_Url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
            const channelRes = await fetch(channelData_Url);
            const channelJson = await channelRes.json();
            setChannelData(channelJson.items[0]);

            const comments_Url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
            const commentsRes = await fetch(comments_Url);
            const commentsJson = await commentsRes.json();
            setCommentData(commentsJson.items);
        } catch (error) {
            console.error("Error fetching channel/comments details", error);
        }
    };

    useEffect(()=>{
        fetchVideoData();
    },[videoId]);

    useEffect(()=>{
        if (apiData) {
            fetchOtherData();
        }
    },[apiData]);

  return (
    <div className='play-video'>
        <iframe src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
        </iframe>
        <h3>{apiData?apiData.snippet.title:"Here comes the title"}</h3>
        <div className='play-video-info'>
            <p>{apiData?views_converter(apiData.statistics.viewCount):"45K"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():"a long time ago"} </p>           
            <div>
                <span>
                    <img src={like} alt='like'/> {apiData?views_converter(apiData.statistics.likeCount):0}
                </span>
                <span>
                    <img src={dislike} alt='dislike'/>
                </span>
                <span>
                    <img src={share} alt='share'/> Share
                </span>
                <span>
                    <img src={save} alt='save'/> Save
                </span>
            </div>
        </div>
        <hr/>
        <div className='publisher'>
            <img src={channelData?channelData.snippet.thumbnails.default.url:"logo"} alt="logo"/>
            <div>
                <p>{apiData?apiData.snippet.channelTitle:"Channel Name"}</p>
                <span>{channelData?views_converter(channelData.statistics.subscriberCount):45} Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className='vid-discription'>
            <p>{apiData?apiData.snippet.description.slice(0, 303):"Description comes here"}</p>
            <hr/>
            <h4>{apiData?views_converter(apiData.statistics.commentCount):45} Comments</h4>
            {Array.isArray(commentData) && commentData.map((item, index)=>{
                return(
                    <div key={index} className='comment'>
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user_profile"/>
                        <div>
                            <h3> {item.snippet.topLevelComment.snippet.authorDisplayName}
                                <span> • {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                            </h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className='comment-action'>
                                <img src={like} alt="like"/>
                                <span>{views_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="dislike"/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
};

export default PlayVideo;