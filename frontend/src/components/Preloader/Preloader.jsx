// import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";
import ReactLoading from "react-loading";
import "./Preloader.css";

function PreLoader() {
  return (
    <div className="preloader_container">
      <ReactLoading
        type="bars"
        color="var(--orange)"
        height={100}
        width={100}
      />
    </div>
  );
}
export default PreLoader;
