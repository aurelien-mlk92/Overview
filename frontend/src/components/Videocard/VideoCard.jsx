import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";
import TimeAgo from "react-timeago";
import { Icon } from "@iconify/react";
import Modal from "../Modal/Modal";
import BackgroundLetterAvatars from "../Avatar/Avatar";

function VideoCard({
  videoId,
  videoUserId,
  videoUsername,
  videoUserAvatar,
  videoTitle,
  videoThumbnail,
  videoDate,
  videoViews,
  canEdit,
  canDelete,
  canRemoveFavorite,
  onDeleteVideo,
  onRemoveFavorite,
  showVideoIcon,
  isInSlider,
}) {
  const [openVideoOptions, setOpenVideoOptions] = useState(false);
  const navigate = useNavigate();
  const videoOptionsMenuRef = useRef();
  const [openModal, setOpenModal] = useState(false);

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
  const formattedViewCount = formatViewCount(videoViews);

  const handleDeleteVideo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/videos/${videoId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.status === 204) {
        onDeleteVideo(videoId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${videoUserId}/favorites`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video_id: videoId,
          }),
        }
      );
      if (response.status === 200) {
        onRemoveFavorite(videoId);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    if (!isInSlider) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200 * index);
          } else {
            entry.target.classList.remove("show");
          }
        });
      });

      const hiddenElements = document.querySelectorAll(".hidden");
      hiddenElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }
    return true;
  }, []);

  return (
    <div className="video_Card hidden">
      <div
        className="thumbnail_Container"
        onClick={() => {
          navigate(`/videos/${videoId}`);
        }}
        onKeyDown={() => {
          navigate(`/videos/${videoId}`);
        }}
        role="button"
        tabIndex={0}
        aria-label="Video Title"
      >
        <img
          className="video_Thumbnail"
          alt="video thumbnail"
          src={videoThumbnail}
        />
      </div>
      {showVideoIcon && (
        <div
          className={`moreVert_Icon_Container ${
            openVideoOptions ? "active" : "inactive"
          }`}
          ref={videoOptionsMenuRef}
        >
          <div
            className="video_Card_Icon_Wrapper"
            onClick={() => {
              setOpenVideoOptions(!openVideoOptions);
            }}
            onKeyDown={() => {
              setOpenVideoOptions(!openVideoOptions);
            }}
            role="button"
            tabIndex={0}
            aria-label="Open video options"
          >
            <Icon
              id="icon_More_Vertical"
              type="button"
              icon="pepicons-pop:dots-y"
              color="#f3f3e6"
              width="35"
              height="35"
            />
          </div>
          <div
            className={`dropdown_Menu ${
              openVideoOptions ? "active" : "inactive"
            }`}
          >
            {canEdit && (
              <button
                className="settings_dropdown_Btn"
                type="button"
                onClick={() => {
                  setOpenVideoOptions(false);
                  navigate(`/videos/${videoId}/edit`);
                }}
              >
                <ul>Edit video details</ul>
              </button>
            )}
            {canDelete && (
              <button
                className="settings_dropdown_Btn"
                type="button"
                onClick={() => {
                  setOpenModal(true);
                  setOpenVideoOptions(false);
                }}
              >
                <ul>Delete video</ul>
              </button>
            )}
            {canRemoveFavorite && (
              <button
                className="settings_dropdown_Btn"
                type="button"
                onClick={() => {
                  setOpenVideoOptions(false);
                  handleRemoveFavorite();
                }}
              >
                <ul>Remove from favorites</ul>
              </button>
            )}
          </div>
        </div>
      )}
      <div className="video_Data">
        <div className="data_Container">
          <div className="avatar_Container">
            <BackgroundLetterAvatars
              width={50}
              height={50}
              username={videoUsername}
              imgsrc={videoUserAvatar}
              userId={videoUserId}
            />
          </div>
          <div className="channel_Details">
            <div
              className="video_Title_Container"
              onClick={() => {
                navigate(`/videos/${videoId}`);
              }}
              onKeyDown={() => {
                navigate(`/videos/${videoId}`);
              }}
              role="button"
              tabIndex={0}
              aria-label="Video"
            >
              <h3 className="video_Title">{videoTitle}</h3>
            </div>

            <div
              className="creator_Username_Container"
              onClick={() => {
                navigate(`/usersprofile/${videoUserId}`);
              }}
              onKeyDown={() => {
                navigate(`/usersprofile/${videoUserId}`);
              }}
              role="button"
              tabIndex={0}
              aria-label="Video Creator"
            >
              <p className="creator_Username">{videoUsername}</p>
            </div>

            <p>
              {formattedViewCount} views &bull;{" "}
              <TimeAgo date={videoDate} minPeriod={60} />
            </p>
          </div>
        </div>
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
                setOpenModal(false);
                handleDeleteVideo();
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
    </div>
  );
}

export default VideoCard;
