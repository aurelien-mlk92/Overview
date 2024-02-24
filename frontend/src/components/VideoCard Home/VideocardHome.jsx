import { useNavigate } from "react-router-dom";
import "./VideocardHome.css";
import TimeAgo from "react-timeago";
import BackgroundLetterAvatars from "../Avatar/Avatar";

function VideocardHome({
  title,
  userId,
  username,
  thumbnailUrl,
  date,
  avatar,
}) {
  const navigate = useNavigate();
  return (
    <div className="video_Card_Home">
      <img
        className="video_Thumbnail_Home"
        alt="video thumbnail"
        src={thumbnailUrl}
      />
      <div className="video_Data_Home">
        <div className="data_Container_Home">
          <div className="avatar_Container">
            <BackgroundLetterAvatars
              sx={{ width: 40, height: 40 }}
              username={username}
              imgsrc={avatar}
              userId={userId}
              onClick={() => {
                navigate(`/usersprofile/${userId}`);
              }}
            />
          </div>
          <div className="channel_Details">
            <h3 className="video_Title">{title}</h3>
            <p className="creator_Username">{username}</p>
            <TimeAgo date={date} minPeriod={60} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideocardHome;
