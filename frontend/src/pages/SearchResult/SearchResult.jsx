import { useEffect, useState, useContext } from "react";
import "./SearchResult.css";
import VideoCard from "../../components/Videocard/VideoCard";
import Header from "../../components/Header/Header";
import useOverview from "../../context/Overviewcontext";
import authContext from "../../context/AuthContext";

function SearchResult() {
  const { searchTerm, searchResultList } = useOverview();
  const [resultText, setResultText] = useState("");
  const auth = useContext(authContext);

  useEffect(() => {
    if (searchResultList.length === 0) {
      setResultText(`Oops ! No results found for '${searchTerm}'`);
    } else if (searchResultList.length === 1) {
      setResultText(`1 result for '${searchTerm}'`);
    } else {
      setResultText(`${searchResultList.length} results for '${searchTerm}'`);
    }
  }, [searchResultList]);

  return (
    <>
      <Header />
      <div
        className={`search_Result_Section_Wrapper ${
          auth?.user ? "connectedSearch" : "notConnectedSearch"
        }`}
      >
        <div className="searched_Text_Container">
          <p>{resultText}</p>
        </div>
        <section className="search_Result_Section">
          {searchResultList.map((video) => (
            <VideoCard
              key={video.video_id}
              videoId={video.video_id}
              videoUserId={video.user_id}
              videoUsername={video.username}
              videoTitle={video.title}
              videoThumbnail={video.thumbnail}
              videoDate={video.date_publication}
              videoViews={video.views}
              videoUserAvatar={video.avatar}
              onDeleteVideo={undefined}
              showVideoIcon={false}
            />
          ))}
        </section>
      </div>
    </>
  );
}
export default SearchResult;
