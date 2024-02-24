import React, { useState, useEffect, useContext } from "react";
import VideoCard from "../Videocard/VideoCard";
import authContext from "../../context/AuthContext";

function ShortTab() {
  const auth = useContext(authContext);
  const [favoriteVideoList, setFavoriteVideoList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);

  const fetchFavoriteVideos = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${
          auth?.user.user_id
        }/favorites?type_video=0`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const favoriteVideos = await response.json();
        setFavoriteVideoList(favoriteVideos);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  useEffect(() => {
    fetchFavoriteVideos();
  }, [isFavorite]);

  const handleRemoveFavorite = (videoId) => {
    setFavoriteVideoList((prevFavList) =>
      prevFavList.filter((video) => video.video_id !== videoId)
    );
    setIsFavorite(false);
    fetchFavoriteVideos();
  };

  return (
    <div className="container_Sub">
      {favoriteVideoList
        ? favoriteVideoList.map((video) => (
            <VideoCard
              videoId={video.video_id}
              videoUserId={video.creator_id}
              videoUsername={video.creator_username}
              videoTitle={video.title}
              videoThumbnail={video.thumbnail}
              videoDate={video.date_publication}
              videoViews={video.view_count}
              videoUserAvatar={video.creator_avatar}
              canEdit={false}
              canDelete={false}
              canRemoveFavorite
              onRemoveFavorite={handleRemoveFavorite}
              showVideoIcon
            />
          ))
        : ""}
    </div>
  );
}

export default ShortTab;
