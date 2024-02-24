import React, { useContext, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import useOverview from "../../context/Overviewcontext";
import authContext from "../../context/AuthContext";
import imageSign from "../../assets/logo_Mobile.svg";

function Header() {
  const navigate = useNavigate();
  const {
    setToggleNavbarDestkop,
    searchTerm,
    setSearchTerm,
    setSearchResultList,
  } = useOverview();
  const auth = useContext(authContext);

  const [showHeader, setShowHeader] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(lastScrollY > currentScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const loadSearchResult = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/videos/search?videoTitle=${searchTerm}&catName=${searchTerm}&tagName=${searchTerm}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const videos = await response.json();
        setSearchResultList(videos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      loadSearchResult();
      navigate(`/search`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.trim() !== "") {
        loadSearchResult();
        navigate(`/search`);
      }
    }
  };

  const handleNavbarClick = (e) => {
    e.stopPropagation();
    setToggleNavbarDestkop(true);
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header
      className={`${auth.user ? "header" : "header-unregistered"} ${
        showHeader ? "" : "hide"
      }`}
    >
      <div
        className="container_Logo"
        onClick={handleLogoClick}
        onKeyDown={handleLogoClick}
        role="button"
        tabIndex="0"
      >
        <img id="logo_Sign" src={imageSign} alt="Logo Overview" />
      </div>
      <div className="container_Search">
        <input
          className="input_Search"
          type="text"
          placeholder="SEARCH"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <Icon
          id="icon_Search"
          type="button"
          onClick={handleSearch}
          icon="iconoir:search"
          color="#f3f3e6"
          width="30"
          height="30"
        />
      </div>
      {auth.user ? (
        <div className="user_Profile_Container">
          <Icon
            id="icon_Sign"
            icon="ph:user-circle-thin"
            color="#f3f3e6"
            width="78"
            height="78"
            onClick={handleNavbarClick}
          />
        </div>
      ) : (
        <button
          type="button"
          className="logIn_Btn"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      )}
    </header>
  );
}

export default Header;
