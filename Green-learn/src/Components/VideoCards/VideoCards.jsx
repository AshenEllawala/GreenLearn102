import React from 'react';
import './VideoCards.css'; // You'll create this CSS file for styling
import thumbnail from '../../assets/video-thumbnail.png'; // Example thumbnail image
import { useNavigate } from 'react-router-dom';

const videoData = [
  { id: 1, title: 'Explore the Forest', thumbnail: thumbnail },
  { id: 2, title: 'Clean and Green Neighborhood', thumbnail: thumbnail },
  { id: 3, title: 'Protecting Nature', thumbnail: thumbnail },
  { id: 4, title: 'Tree Facts', thumbnail: thumbnail },
  { id: 5, title: 'Ocean Wonders', thumbnail: thumbnail },
  { id: 6, title: 'Rainforest Adventure', thumbnail: thumbnail },
  { id: 7, title: 'Bird Watching Tips', thumbnail: thumbnail },
  { id: 8, title: 'Climate Change Basics', thumbnail: thumbnail },
  { id: 9, title: 'Insect World', thumbnail: thumbnail },
  { id: 10, title: 'Why Trees Matter', thumbnail: thumbnail },
];

const VideoCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (videoId) => {
    // Navigate to a specific video page if needed
     navigate(`/video/${videoId}`);
    // Example: navigate(`/video/${videoId}`);
  };

  return (
    <div className="video-cards-container">
      <h1 className="video-cards-title">Our Nature Video Collection</h1>
      <div className="video-cards-grid">
        {videoData.map((video) => (
          <div
            key={video.id}
            className="video-card"
            onClick={() => handleCardClick(video.id)}
          >
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCards;
