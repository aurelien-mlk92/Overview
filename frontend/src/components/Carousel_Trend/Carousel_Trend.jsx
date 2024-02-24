import { useState, useEffect } from "react";
import Slider from "react-slick";
import VideoCard from "../Videocard/VideoCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel_Trend.css";

function CarouselTrend() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/videos/most-viewed`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const videosData = await response.json();
        setVideos(videosData);
      } else {
        console.error("Erreur lors de la récupération des vidéos.");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <section>
      <Slider
        className="slider_Trend"
        dots
        infinite
        speed={500}
        slidesToShow={4}
        slidesToScroll={1}
        arrows={false}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
            },
          },
        ]}
      >
        {videos.map((video) => (
          <div key={video.video_id}>
            <VideoCard
              key={video.video_id}
              videoId={video.video_id}
              videoUserId={video.user_id}
              videoUsername={video.username}
              videoTitle={video.title}
              videoThumbnail={video.thumbnail}
              videoDate={video.date_publication}
              videoViews={video.view_count}
              videoUserAvatar={video.avatar}
              isInSlider={false}
              // onDeleteVideo={handleDeleteVideoFromState}
              showVideoIcon={false}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default CarouselTrend;
