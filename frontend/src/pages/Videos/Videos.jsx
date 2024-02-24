import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import AddComment from "../../assets/AddComment.png";
import Description from "../../components/Description/Description";
import Header from "../../components/Header/Header";
import WatchingVideoCard from "../../components/Watch/Video/WatchingVideoCard";
import Comments from "../../components/Comments/Comments";
import "./Video.css";
import authContext from "../../context/AuthContext";
import useSelectedVideo from "../../context/SelectedVideo";

function Videos() {
  const { id } = useParams();
  const [videoInfo, setVideoInfo] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState(false);
  const auth = useContext(authContext);
  const { selectedVideo } = useSelectedVideo();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3310/api/videos/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 200) {
          const data = await response.json();
          setVideoInfo(data);
        } else {
          navigate("/*");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideoInfo();
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (comment.trim() !== "") {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              comment,
              user_id: auth.user_id,
              video_id: selectedVideo.video_id,
            }),
          }
        );
        if (response.status === 201) {
          const newComment = await response.json();
          const formattedNewComment = {
            ...newComment,
            date_comment: formatDate(newComment.date_comment),
          };
          setComment("");
          setInputComment(false);
          setComments([...comments, formattedNewComment]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const showComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/videos/${id}/comments`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const allComments = await response.json();
          const formattedComments = allComments.map((coms) => ({
            ...coms,
            date_comment: formatDate(coms.date_comment),
          }));
          setComments(formattedComments);
        }
      } catch (error) {
        console.error(error);
      }
    };
    showComments();
  }, [inputComment]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const toggleInputComment = () => {
    setInputComment(!inputComment);
  };

  const handleDeleteCommentFromState = (deletedCommentId) => {
    setComments((prevComments) =>
      prevComments.filter((com) => com.comment_id !== deletedCommentId)
    );
  };
  const handleUpdateCommentInState = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((com) =>
        com.comment_id === updatedComment.comment_id
          ? { ...updatedComment }
          : com
      )
    );
  };

  return (
    <main>
      <Header />
      <div
        className={`container_Body_Video ${
          auth?.user ? "connectedVideo" : "notConnecteVideo"
        }`}
      >
        <WatchingVideoCard data={videoInfo} />
        <div className="desc_N_Coms">
          <Description data={videoInfo} />
          <Comments
            data={comments}
            handleDeleteCommentFromState={handleDeleteCommentFromState}
            handleUpdateCommentInState={handleUpdateCommentInState}
          />
        </div>
        {auth?.user?.user_id && (
          <div className="inputSection">
            {inputComment ? (
              <div className="container_Comment">
                <input
                  className="input_Comment"
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
                <Icon
                  id="icon_Search"
                  type="button"
                  onClick={handleSubmit}
                  icon="material-symbols:upload"
                  color="#F3F3E6"
                  width="50"
                  height="50"
                />
              </div>
            ) : (
              <div
                role="button"
                onClick={toggleInputComment}
                onKeyDown={toggleInputComment}
                className="addCommentSection"
                tabIndex="-11"
              >
                <img
                  src={AddComment}
                  alt="Add Comment"
                  className="addCommentButton"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
export default Videos;
