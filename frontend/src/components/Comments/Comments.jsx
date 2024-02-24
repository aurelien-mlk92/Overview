import { useRef, useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import BackgroundLetterAvatars from "../Avatar/Avatar";
import authContext from "../../context/AuthContext";
import "./Comments.css";

function CommentItem({
  comment,
  handleDeleteCommentFromState,
  handleUpdateCommentInState,
  currentUserID,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment?.comment);
  const isCommentOwner = comment?.user_id === currentUserID;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleUpdateComment = async (newCommentText) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${comment?.comment_id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: newCommentText,
          }),
        }
      );
      if (response.status === 204) {
        handleUpdateCommentInState({ ...comment, comment: newCommentText });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteComment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${comment?.comment_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.status === 204) {
        handleDeleteCommentFromState(comment?.comment_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedComment(comment?.comment);
  };
  const handleSaveEdit = async () => {
    if (editedComment !== comment?.comment) {
      setIsEditing(false);
      await handleUpdateComment(editedComment);
      setEditedComment(editedComment);
    }
  };

  return (
    <div className="all_Comments">
      <div className="comment_Section">
        <div className="user_N_Date">
          <div className="all_User">
            <BackgroundLetterAvatars
              sx={{ width: 40, height: 40 }}
              username={comment?.username}
              userId={comment?.user_id}
            />
            <div className="user">
              <p>{comment?.username}</p>
            </div>
          </div>
          <div className="date">
            <p>{comment?.date_comment}</p>
          </div>
        </div>
        <div className="comment_Info">
          {isCommentOwner && (
            <div
              className={`moreVert_Icon_Container_Comment ${
                isOpen ? "active" : "inactive"
              }`}
              ref={menuRef}
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={() => setIsOpen(!isOpen)}
              tabIndex="0"
              role="button"
            >
              <Icon
                id="icon_More_Vertical"
                icon="pepicons-pop:dots-y"
                color="#f3f3e6"
                width="37"
                height="37"
              />
              {isOpen && (
                <div
                  className={`dropdown_Menu ${isOpen ? "active" : "inactive"}`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsEditing(true);
                    }}
                  >
                    <ul>Edit Comment</ul>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      handleDeleteComment();
                    }}
                  >
                    <ul>Delete Comment</ul>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="comment_container">
          {isEditing ? (
            <input
              value={editedComment}
              onChange={handleChange}
              onBlur={handleSaveEdit}
            />
          ) : (
            <p>{comment?.comment}</p>
          )}
          {isEditing && (
            <div>
              <button
                type="button"
                onClick={handleSaveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveEdit();
                  }
                }}
              >
                Ok
              </button>
              <button type="button" onClick={handleCancelEdit}>
                Revert
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function Comments({
  data,
  handleDeleteCommentFromState,
  handleUpdateCommentInState,
}) {
  const auth = useContext(authContext);
  return (
    <div className="comments_Component">
      <p className="title">Comments</p>
      {data.map((comment) => (
        <CommentItem
          key={comment?.comment_id}
          comment={comment}
          handleDeleteCommentFromState={handleDeleteCommentFromState}
          handleUpdateCommentInState={handleUpdateCommentInState}
          currentUserID={auth?.user?.user_id}
        />
      ))}
    </div>
  );
}
export default Comments;
