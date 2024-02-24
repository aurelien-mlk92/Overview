import "./NotFound.css";
import Header from "../../components/Header/Header";
import imageSign from "../../assets/logo_Mobile.svg";

function NotFound() {
  return (
    <>
      <Header />
      <div className="whole_Container">
        <div className="container_Body_NotFound">
          <p className="four">4</p>
          <img src={imageSign} alt="Logo de la page d'erreur 404" />
          <p className="four">4</p>
        </div>
        <div className="container_Title_NotFound">
          <h1 className="Title_Not">PAGE NOT</h1>
          <h1 className="Title_Found">FOUND</h1>
        </div>
      </div>
    </>
  );
}
export default NotFound;
