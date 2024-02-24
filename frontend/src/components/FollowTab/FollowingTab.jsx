import React, { useState, useEffect } from "react";
import Subcard from "../SubCard/SubCard";
import useSelectedUser from "../../context/SelectedUserContext";

function FollowingTab() {
  const [following, setFollowing] = useState([]);
  const { selectedUser, isFollowed, setIsFollowed } = useSelectedUser();

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${
            selectedUser?.user_id
          }/following`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const followingData = await response.json();
          setFollowing(followingData);
        } else {
          console.error("Erreur lors de la récupération des followed.");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchFollowing();
  }, [isFollowed]);

  const handleRemoveFollower = (followerId) => {
    setFollowing((prevFollowing) =>
      prevFollowing.filter((follower) => follower.user_id !== followerId)
    );
    setIsFollowed(false);
  };

  return (
    <div className="container_Sub">
      {following
        ? following.map((follow) => (
            <Subcard
              key={follow.user_id}
              userId={follow.user_id}
              username={follow.username}
              avatar={follow.avatar}
              width={50}
              height={50}
              followType={false}
              onRemoveFollower={() => handleRemoveFollower(follow.user_id)}
            />
          ))
        : ""}
    </div>
  );
}

export default FollowingTab;
