import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

function stringToColor(string) {
  if (!string) {
    return "#000";
  }
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

export default function BackgroundLetterAvatars({
  username,
  imgsrc,
  userId,
  width,
  height,
}) {
  const navigate = useNavigate();
  const initial = username ? username[0].toUpperCase() : "";

  return (
    <Avatar
      onClick={() => {
        navigate(`/usersprofile/${userId}`);
      }}
      sx={{
        bgcolor: stringToColor(username),
        width: { width },
        height: { height },
      }}
      alt={`${username?.toUpperCase()}`}
      src={imgsrc || "/broken-image.jpg"}
    >
      {initial}
    </Avatar>
  );
}
