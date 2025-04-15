import React from "react";
import { useState , useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';


//declare the function home for the home page for streaming videos application 
const Home = () => {
      const { user, logOut } = UserAuth();
      const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
}

//fetch the videos from the API using useEffect hook


//display the videos in a grid format using map function
const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };


return(

<div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          Lan prime
        </h1>
      </Link>




    <div className="home-container">
      <h1>Welcome to the Video Streaming App</h1>
      {loading && <p>Loading videos...</p>}
      {error && <p>Error loading videos: {error.message}</p>}
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.thumbnail} alt={video.title} />
            <h2>{video.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};



)

export default Home;

  