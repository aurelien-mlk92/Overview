import { useState } from "react";
import Header from "../../components/Header/Header";
import Mytabs from "../../components/Tab/Tab";
import "./Subscriptions.css";
import imageSign from "../../assets/logo_Mobile.svg";

function Subscriptions() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const isMobile = window.innerWidth < 1024;
  return (
    <main className="container_Body_Sub">
      {isMobile ? (
        <div className="container_Header_Sign">
          <img id="logo_Sign" src={imageSign} alt="logo_Overview" />
        </div>
      ) : (
        <Header />
      )}
      <div className="container_Title_Sub">
        <h1 className="title_Sub">SUBSCRIPTIONS</h1>
      </div>
      <div className="container_Tab_Sub">
        <Mytabs tabValue={tabValue} handleChange={handleChange} />
      </div>
    </main>
  );
}

export default Subscriptions;