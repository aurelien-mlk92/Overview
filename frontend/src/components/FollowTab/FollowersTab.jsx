import React, { useState, useEffect } from "react";
import Subcard from "../SubCard/SubCard";
import useSelectedUser from "../../context/SelectedUserContext";

function FollowersTab() {
  const [followers, setFollowers] = useState([]);
  const { selectedUser, isFollowed, setIsFollowed } = useSelectedUser();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${
            selectedUser?.user_id
          }/followers`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const followersData = await response.json();
          setFollowers(followersData);
        } else {
          console.error("Erreur lors de la récupération des followers.");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchFollowers();
  }, [isFollowed]);

  const handleRemoveFollower = (followerId) => {
    setFollowers((prevFollowers) =>
      prevFollowers.filter((follower) => follower.user_id !== followerId)
    );
    setIsFollowed(false);
  };

  return (
    <div className="container_Sub">
      {followers
        ? followers.map((follow) => (
            <Subcard
              key={follow.user_id}
              userId={follow.user_id}
              username={follow.username}
              avatar={follow.avatar}
              width={50}
              height={50}
              followType
              onRemoveFollower={() => handleRemoveFollower(follow.user_id)}
            />
          ))
        : ""}
    </div>
  );
}

export default FollowersTab;
