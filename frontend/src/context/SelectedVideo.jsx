import { createContext, useState, useMemo, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";

const selectedVideoContext = createContext();

function SelectedVideoProvider({ children }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoTags, setSelectedVideoTags] = useState([]);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const getSelectedVideo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/videos/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const video = await response.json();
          setSelectedVideo(video);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSelectedVideo();

    const getSelectedVideoTags = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/videos/${id}/tags`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const tags = await response.json();
          setSelectedVideoTags(tags);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSelectedVideoTags();
  }, [id, location.pathname]);

  const auth = useMemo(
    () => ({
      selectedVideo,
      setSelectedVideo,
      selectedVideoTags,
      setSelectedVideoTags,
    }),
    [selectedVideo, selectedVideoTags]
  );

  return (
    <selectedVideoContext.Provider value={auth}>
      {children}
    </selectedVideoContext.Provider>
  );
}

const useSelectedVideo = () => useContext(selectedVideoContext);
export default useSelectedVideo;
export { SelectedVideoProvider };
