import { useState, useEffect, useRef, useContext } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import BackgroundLetterAvatars from "../Avatar/Avatar";
import "./SubCard.css";
import useSelectedUser from "../../context/SelectedUserContext";
import authContext from "../../context/AuthContext";

function SubCard({ username, avatar, userId, followType, onRemoveFollower }) {
  const subOptionsMenuRef = useRef();
  const auth = useContext(authContext);
  const { selectedUser, setIsFollowed } = useSelectedUser();
  const [openSubOptions, setOpenSubOptions] = useState(false);
  const [exit, setExit] = useState(false);
  const navigate = useNavigate();

  const handleRemoveFollower = async () => {
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
            follower_id: userId,
            followed_id: auth?.user?.user_id,
          }),
        }
      );
      if (response.status === 204) {
        setIsFollowed(false);
        setExit(true);
        setTimeout(() => {
          onRemoveFollower();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFollowing = async () => {
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
            followed_id: userId,
          }),
        }
      );
      if (response.status === 204) {
        setIsFollowed(false);
        setExit(true);
        setTimeout(() => {
          onRemoveFollower();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!subOptionsMenuRef.current.contains(e.target)) {
        setOpenSubOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`container_Subcard_In ${exit ? "exitAnimation" : ""}`}>
      <div className="avatar_And_Username_Container">
        <div className="avatar_Container">
          <BackgroundLetterAvatars
            width={50}
            height={50}
            username={username}
            imgsrc={avatar}
            userId={userId}
          />
        </div>
        <button
          type="button"
          className="subCard_Username"
          onClick={() => {
            navigate(`/usersprofile/${userId}`);
          }}
        >
          {username}
        </button>
      </div>

      <div
        className={`moreVert_Icon_ContainerSub ${
          openSubOptions ? "active" : "inactive"
        }`}
        ref={subOptionsMenuRef}
      >
        <div
          className="video_Card_Icon_Wrapper"
          onClick={() => {
            setOpenSubOptions(!openSubOptions);
          }}
          onKeyDown={() => {
            setOpenSubOptions(!openSubOptions);
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
            onClick={() => {
              setOpenSubOptions(!openSubOptions);
            }}
          />
        </div>
        <div
          className={`dropdown_Menu ${openSubOptions ? "active" : "inactive"}`}
        >
          {followType ? (
            <button
              className="remove_Follower_Btn"
              type="button"
              onClick={() => {
                setOpenSubOptions(false);
                handleRemoveFollower();
              }}
            >
              Remove follower
            </button>
          ) : (
            <button
              className="remove_Follower_Btn"
              type="button"
              onClick={() => {
                setOpenSubOptions(false);
                handleRemoveFollowing();
              }}
            >
              Unfollow account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubCard;
