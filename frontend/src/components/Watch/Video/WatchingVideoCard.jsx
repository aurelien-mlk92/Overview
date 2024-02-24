import ReactPlayer from "react-player";
import { React, useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./WatchingVideoCard.css";
import { Icon } from "@iconify/react";
import BackgroundLetterAvatars from "../../Avatar/Avatar";
import follow from "../../../assets/follow.png";
import unfollow from "../../../assets/unfollow.png";
import Modal from "../../Modal/Modal";
import useSelectedVideo from "../../../context/SelectedVideo";
import authContext from "../../../context/AuthContext";
import useSelectedUser from "../../../context/SelectedUserContext";
import useOverview from "../../../context/Overviewcontext";

function VideoCard({ data }) {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const { isFollowed, setIsFollowed, selectedUser } = useSelectedUser();
  const { setFavoriteVideoList } = useOverview();
  const [openVideoOptions, setOpenVideoOptions] = useState(false);
  const videoOptionsMenuRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [isLiked, setIsLiked] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { selectedVideo } = useSelectedVideo();
  const [viewCountTracker, setViewCountTracker] = useState(0);
  const [likeCount, setLikeCount] = useState(data?.like_count);

  const isMobile = window.innerWidth < 1024;
  const handleClose = () => {
    setOpenModal(false);
  };

  function formatViewCount(viewCount) {
    if (viewCount < 1000) {
      return viewCount;
      // eslint-disable-next-line no-else-return
    } else if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)} M`;
    } else if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)} K`;
    }
    return viewCount;
  }
  const formattedViewCount = formatViewCount(viewCountTracker);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!videoOptionsMenuRef.current.contains(e.target)) {
        setOpenVideoOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/videos/${data?.video_id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const jsonData = await response.json();
          setViewCountTracker(jsonData.view_count);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchViewCount();
  }, [data.video_id]);

  const handleAddViews = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/videos/${
          data.video_id
        }/viewsUpdate`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idVideo: data.video_id,
            idUser: data.user_id,
          }),
        }
      );
      if (response.ok) {
        const jsonData = await response.json();
        setViewCountTracker(jsonData.viewCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkIsLiked = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/videos/${data.video_id}/isLiked`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) setIsLiked(true);
        else setIsLiked(false);
      } catch (error) {
        console.error(error);
      }
    };
    checkIsLiked();
  }, [data.video_id]);

  useEffect(() => {
    const checkIsVideoFavorite = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/videos/${
            data.video_id
          }/isFavorite`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) setIsFavorite(true);
        else setIsFavorite(false);
      } catch (error) {
        console.error(error);
      }
    };
    checkIsVideoFavorite();
  }, [data.video_id]);

  const handleFavorites = async () => {
    if (!isFavorite) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${
            auth?.user?.user_id
          }/favorites`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              video_id: data.video_id,
            }),
          }
        );
        if (response.status === 200) {
          const newFavoriteVideo = await response.json();
          setFavoriteVideoList((prevList) => [...prevList, newFavoriteVideo]);
          setIsFavorite(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${
            auth?.user?.user_id
          }/favorites`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              video_id: data.video_id,
            }),
          }
        );
        if (response.status === 200) {
          const removedFavoriteVideo = await response.json();
          setFavoriteVideoList((prevList) =>
            prevList.filter(
              (video) => video.video_id !== removedFavoriteVideo.video_id
            )
          );
          setIsFavorite(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLike = async () => {
    if (!isLiked) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/videos/${data?.user_id}/like`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              video_id: data.video_id,
            }),
          }
        );
        if (response.status === 200) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/videos/${data?.user_id}/like`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              video_id: data.video_id,
            }),
          }
        );
        if (response.status === 200) {
          setIsLiked(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchVideoLikes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/videos/${data?.video_id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const likedData = await response.json();
          // console.log("like count", likedData)
          setLikeCount(likedData?.like_count);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideoLikes();
  }, [isLiked]);

  const handleFollowClick = async () => {
    if (!isFollowed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${data?.user_id}/follow`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              follower_id: auth?.user?.user_id,
              followed_id: data?.user_id,
            }),
          }
        );
        if (response.status === 204) setIsFollowed(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${
            selectedUser?.user_id
          }/unfollow`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              follower_id: auth?.user?.user_id,
              followed_id: selectedUser?.user_id,
            }),
          }
        );
        if (response.status === 204) setIsFollowed(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteVideo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/videos/${data.video_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.status === 204) {
        navigate("/");
      } else {
        console.error("Failed to delete video");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   console.log("lik", isLiked);
  // }, [isLiked]);
  return (
    <>
      {isMobile ? (
        <ReactPlayer
          controls
          url={selectedVideo?.URL_video}
          height={280}
          width="100%"
          onStart={handleAddViews}
        />
      ) : (
        <ReactPlayer
          controls
          url={selectedVideo?.URL_video}
          height={543}
          width={966}
          onStart={handleAddViews}
        />
      )}
      <div className="watch_Video_Card">
        <div className="flex_Watch_Video_Info">
          {!isMobile && (
            <div className="avatar_Container_Watch">
              <BackgroundLetterAvatars
                width={40}
                height={40}
                username={data?.username}
                userId={data?.user_id}
              />
              <p className="creator_Username_Watch">{data?.username}</p>
            </div>
          )}
          <div className="view_Icon_Watch_Bloc">
            <Icon
              icon="lets-icons:view-alt-fill"
              className="view_Icon_Watch"
              alt="View Icon Number"
              width="38"
              height="38"
            />
            <span>{formattedViewCount}</span>
          </div>
          <div className="like_Icon_Watch_Bloc">
            <div className="like_Icon_Watch_Bloc">
              {isLiked ? (
                <Icon
                  icon="ph:heart-fill"
                  color="var(--white)"
                  className="like_Icon_Watch"
                  alt="Like Icon Number"
                  width="38"
                  height="38"
                  onClick={handleLike}
                />
              ) : (
                <Icon
                  icon="ph:heart"
                  className="like_Icon_Watch"
                  alt="Like Icon Number"
                  width="38"
                  height="38"
                  onClick={handleLike}
                />
              )}
              <span>{likeCount}</span>
            </div>
          </div>
          <div className="favorite_Icon_Watch_Bloc">
            {isFavorite ? (
              <Icon
                icon="teenyicons:star-solid"
                className="favorite_Icon_Watch"
                alt="Favorite Icon"
                width="34"
                height="34"
                onClick={handleFavorites}
              />
            ) : (
              <Icon
                icon="teenyicons:star-outline"
                color="var(---white)"
                className="favorite_Icon_Watch"
                alt="Favorite Icon"
                width="34"
                height="34"
                onClick={handleFavorites}
              />
            )}
          </div>
          {auth?.user?.user_id !== data.user_id && (
            <div
              className="simple-line-icons:user-following "
              tabIndex="-17"
              role="button"
              onClick={handleFollowClick}
              onKeyDown={handleFollowClick}
            >
              <img
                src={isFollowed ? unfollow : follow}
                className="follow_Icon_Watch"
                alt="Follow Icon"
              />
            </div>
          )}

          {auth.user && auth.user.user_id === data.user_id && (
            <div
              className={`moreVert_Icon_Container_Watch ${
                openVideoOptions ? "active" : "inactive"
              }`}
              ref={videoOptionsMenuRef}
            >
              <Icon
                id="icon_More_Vertical"
                type="button"
                icon="pepicons-pop:dots-y"
                color="#f3f3e6"
                width="37"
                height="37"
                onClick={() => {
                  setOpenVideoOptions(!openVideoOptions);
                }}
              />
              <div
                className={`dropdown_Menu ${
                  openVideoOptions ? "active" : "inactive"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenVideoOptions(false);
                    navigate(`/videos/${data?.video_id}/edit`);
                  }}
                >
                  <ul>Edit video</ul>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(true);
                    setOpenVideoOptions(false);
                  }}
                >
                  <ul>Delete video</ul>
                </button>
              </div>
            </div>
          )}
        </div>
        {openModal && (
          <Modal onClose={handleClose}>
            <div className="modal_Content">
              <h1>Are you sure you want to delete this video? </h1>
            </div>
            <div className="modal_Footer">
              <button
                type="button"
                className="modal_Btn"
                onClick={() => {
                  handleDeleteVideo();
                  setOpenModal(false);
                }}
              >
                YES
              </button>
              <button
                type="button"
                className="modal_Btn"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                NO
              </button>
            </div>
          </Modal>
        )}
        <div className="watch_Video_Data">
          <div className="data_Container_Watch">
            {isMobile && (
              <div className="avatar_Container_Watch_Mobile">
                <BackgroundLetterAvatars
                  sx={{ width: 35, height: 35 }}
                  username={data?.username}
                  userId={data?.user_id}
                />
                <p className="creator_Username_Watch">{data?.username}</p>
              </div>
            )}
            <div className="channel_Details_Watch">
              <h3 className="video_Title_Watch">{data?.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoCard;
