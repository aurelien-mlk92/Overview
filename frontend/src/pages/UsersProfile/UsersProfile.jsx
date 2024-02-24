import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar-edit";
import { Icon } from "@iconify/react";
import Header from "../../components/Header/Header";
import "./UsersProfile.css";
import VideoCard from "../../components/Videocard/VideoCard";
import BackgroundLetterAvatars from "../../components/Avatar/Avatar";
import authContext from "../../context/AuthContext";
import useSelectedUser from "../../context/SelectedUserContext";
import Modal from "../../components/Modal/Modal";

function UserProfile() {
  const auth = useContext(authContext);
  const { isFollowed, setIsFollowed } = useSelectedUser();
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const [openUserSettings, setOpenUserSettings] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const navigate = useNavigate();
  const settingsMenuRef = useRef();
  const [isEditingUserDescription, setIsEditingUserDescription] =
    useState(false);
  const inputRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [userVideos, setUserVideos] = useState([]);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [profileImg, setProfileImg] = useState(auth?.user?.avatar);
  const [newUsername, setNewUsername] = useState(auth?.user?.username);
  const [newUserDescription, setNewUserDescription] = useState(
    auth?.user?.channel_description
  );

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAvatarClose = () => {
    setOpenAvatarModal(false);
  };

  function dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const onCrop = (i) => {
    setProfileImg(dataURLtoFile(i, `avatar-${selectedUser.user_id}.png`));
  };

  useEffect(() => {
    const loadUserVideos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${
            selectedUser?.user_id
          }/videos`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const videos = await response.json();
          setUserVideos(videos);
        }
        return userVideos;
      } catch (error) {
        console.error(error);
      }
      return true;
    };
    loadUserVideos();
  }, [selectedUser]);

  const logOut = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/logOut`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        auth.setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUsername = () => {
    setIsEditingUsername(true);
    setNewUsername(auth?.user?.username);
    setOpenUserSettings(false);
  };

  const handleEditUserDescription = () => {
    setIsEditingUserDescription(true);
    setNewUserDescription(auth?.user?.channel_description);
    setOpenUserSettings(false);
  };

  const handleSaveNewUserAvatar = async () => {
    try {
      const form = new FormData();
      form.append("avatar", profileImg);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${selectedUser?.user_id}`,
        {
          method: "PUT",
          credentials: "include",
          body: form,
        }
      );
      if (response.status === 200) {
        const userInfo = await response.json();
        setProfileImg(userInfo.avatar);
        auth.setUser((prevUser) => ({
          ...prevUser,
          avatar: userInfo.avatar,
        }));

        setSelectedUser((prevUser) => ({
          ...prevUser,
          avatar: userInfo.avatar,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveUsername = async () => {
    if (newUsername.trim() !== "") {
      auth.setUser((prevUser) => ({
        ...prevUser,
        username: newUsername,
      }));
      setIsEditingUsername(false);
      setErrorUsername(false);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${selectedUser?.user_id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: newUsername,
            }),
          }
        );
        if (response.status === 200) {
          const userInfo = await response.json();
          setNewUsername(userInfo.username);
          auth.setUser((prevUser) => ({
            ...prevUser,
            username: userInfo.username,
          }));

          setSelectedUser((prevUser) => ({
            ...prevUser,
            username: userInfo.username,
          }));
        }
        return newUsername;
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorUsername(true);
    }
    return true;
  };

  const handleSaveUserDescription = async () => {
    if (newUserDescription.trim() !== "") {
      auth.setUser((prevUser) => ({
        ...prevUser,
        description: newUserDescription,
      }));
      setIsEditingUserDescription(false);
      setErrorDescription(false);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${selectedUser?.user_id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              channel_description: newUserDescription,
            }),
          }
        );
        if (response.status === 200) {
          const userInfo = await response.json();
          setNewUserDescription(userInfo.channel_description);
          auth.setUser((prevUser) => ({
            ...prevUser,
            channel_description: userInfo.channel_description,
          }));

          setSelectedUser((prevUser) => ({
            ...prevUser,
            channel_description: userInfo.channel_description,
          }));
        }
        return newUserDescription;
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorDescription(true);
    }
    return true;
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${selectedUser?.user_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.status === 204) {
        auth.setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVideoFromState = (deletedVideoId) => {
    // Remove the deleted video from the state
    setUserVideos((prevVideos) =>
      prevVideos.filter((video) => video.video_id !== deletedVideoId)
    );
  };

  useEffect(() => {
    auth.setUser((prevUser) => ({
      ...prevUser,
      username: newUsername,
    }));
  }, [newUsername, auth.setUser]);

  useEffect(() => {
    auth.setUser((prevUser) => ({
      ...prevUser,
      description: newUserDescription,
    }));
  }, [newUserDescription, auth.setUser]);

  useEffect(() => {
    if (isEditingUsername && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingUsername]);

  useEffect(() => {
    if (isEditingUserDescription && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingUserDescription]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!settingsMenuRef.current.contains(e.target)) {
        setOpenUserSettings(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFollowClick = async () => {
    if (!isFollowed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${
            selectedUser?.user_id
          }/follow`,
          {
            method: "POST",
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

  return (
    <>
      <Header />
      <section className="container_Body_User_Profile">
        <section className="user_Info_Container">
          <div className="img_And_Username_And_Settings_Container">
            <div className="img_And_Username_Container">
              <div className="user_Profile_Img_Container">
                {selectedUser?.username ? (
                  <BackgroundLetterAvatars
                    width={70}
                    height={70}
                    username={selectedUser?.username}
                    imgsrc={selectedUser?.avatar}
                    userId={selectedUser?.user_id}
                  />
                ) : null}
              </div>
              <div className="username_Container">
                {isEditingUsername ? (
                  <div className="edit_Container">
                    <div className="input_Container">
                      <input
                        className="edit_Input"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        ref={inputRef}
                        required
                      />
                      <button
                        className="save_New_Data_Btn"
                        type="button"
                        onClick={handleSaveUsername}
                      >
                        Save
                      </button>
                    </div>{" "}
                    {errorUsername ? (
                      <div className="error_Message_Container">
                        <p className="error_Message">Username can't be empty</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <h1 className="username">{selectedUser?.username}</h1>
                )}
              </div>
            </div>
            {auth?.user &&
              (auth?.user?.user_id === selectedUser?.user_id ? (
                <div className="settings_General_Wrapper">
                  <div
                    className={`settings_Container ${
                      openUserSettings ? "active" : "inactive"
                    }`}
                    ref={settingsMenuRef}
                  >
                    <div
                      className="icon_Settings_Container"
                      onClick={() => {
                        setOpenUserSettings(!openUserSettings);
                      }}
                      onKeyDown={() => {
                        setOpenUserSettings(!openUserSettings);
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label="Toggle User Settings"
                    >
                      <Icon
                        id="icon_Settings"
                        type="button"
                        icon="material-symbols:settings"
                        color="#f3f3e6"
                        width="35"
                        height="35"
                      />
                    </div>
                    <div
                      className={`dropdown_Settings ${
                        openUserSettings ? "active" : "inactive"
                      }`}
                    >
                      <button onClick={logOut} type="button">
                        <ul>Log out</ul>
                      </button>
                      <button onClick={handleEditUsername} type="button">
                        <ul>Edit username</ul>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenAvatarModal(true);
                          setOpenUserSettings(false);
                        }}
                      >
                        <ul>Edit profile picture</ul>
                      </button>
                      <button
                        onClick={() => {
                          handleEditUserDescription();
                        }}
                        type="button"
                      >
                        <ul>Edit profile description</ul>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenModal(true);
                          setOpenUserSettings(false);
                        }}
                      >
                        <ul>Delete account</ul>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="follow_Btn_Container">
                  <button
                    type="button"
                    className={
                      isFollowed ? "follow_Btn inactive" : "follow_Btn active"
                    }
                    onClick={handleFollowClick}
                  >
                    {isFollowed ? "Unfollow" : "Follow"}
                  </button>
                </div>
              ))}
          </div>
          <div className="user_Description_Container">
            {isEditingUserDescription ? (
              <div className="edit_Container">
                <div className="input_Container">
                  <input
                    className="edit_Input"
                    type="text"
                    value={newUserDescription}
                    onChange={(e) => setNewUserDescription(e.target.value)}
                    ref={inputRef}
                    required
                  />
                  <button
                    className="save_New_Data_Btn"
                    type="button"
                    onClick={handleSaveUserDescription}
                  >
                    Save
                  </button>
                </div>
                {errorDescription ? (
                  <div className="error_Message_Container">
                    <p className="error_Message">
                      Channel description cannot be empty
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <h2 className="user_Description">
                {selectedUser?.channel_description}
              </h2>
            )}
          </div>
        </section>
        <section className="video_Section">
          {[...userVideos].reverse().map((video) => (
            <VideoCard
              key={video.video_id}
              videoId={video.video_id}
              videoUserId={video.user_id}
              videoUsername={video.username}
              videoTitle={video.title}
              videoThumbnail={video.thumbnail}
              videoDate={video.date_publication}
              videoViews={video.view_count}
              videoUserAvatar={selectedUser.avatar}
              canDelete={auth?.user?.user_id === selectedUser?.user_id}
              canEdit={auth?.user?.user_id === selectedUser?.user_id}
              canRemoveFavorite={false}
              onDeleteVideo={handleDeleteVideoFromState}
              showVideoIcon={auth?.user?.user_id === selectedUser?.user_id}
            />
          ))}
        </section>
        {openModal && (
          <Modal onClose={handleClose}>
            <div className="modal_Content">
              <h1>Are you sure you want to delete your account? </h1>
            </div>
            <div className="modal_Footer">
              <button
                type="button"
                className="modal_Btn"
                onClick={() => {
                  setOpenModal(false);
                  handleDeleteAccount();
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
        {openAvatarModal && (
          <Modal onClose={handleAvatarClose}>
            <div className="modal_Content">
              <Avatar
                width={390}
                height={295}
                onCrop={onCrop}
                onClose={handleAvatarClose}
              />
              <button
                type="button"
                className="modal_Btn"
                onClick={() => {
                  handleSaveNewUserAvatar();
                  setOpenAvatarModal(false);
                }}
              >
                Save profile picture
              </button>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}

export default UserProfile;
