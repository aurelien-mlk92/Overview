import React from "react";
import "./ShortCard.css";

function ShortCard({ title, thumbnailUrl, author, views, uploadDate }) {
  return (
    <div className="short-card-overlay">
      <div className="thumbnail-overlay">
        <img src={thumbnailUrl} alt="Thumbnail" />
        <div className="text-overlay">
          <h3 className="title">{title}</h3>
          <p className="author">{author}</p>
          <p className="views">{views} views</p>
          <p className="upload-date">{uploadDate}</p>
        </div>
      </div>
    </div>
  );
}

export default ShortCard;
