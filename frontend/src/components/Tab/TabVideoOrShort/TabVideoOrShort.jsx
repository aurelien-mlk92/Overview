import React from "react";
import { Tab, Tabs } from "@mui/material";
import VideoTab from "../../VideoOrShortTab/VideoTab";
import ShortTab from "../../VideoOrShortTab/ShortTab";
import "./TabVideoOrShort.css";

function MyVideoTabs({ tabValue, handleChange }) {
  return (
    <div className="container_Tabs">
      <Tabs
        sx={{
          fontFamily: "poppins",
          fontSize: "20px",
          borderBottom: "1px solid white",
          "& .MuiTabs-scroller": {},
          "& .Mui-selected": {
            color: "var(--orange)",
            fontSize: "20px",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--orange)",
          },
          "& .MuiTab-root[aria-selected=false]": {
            color: "var(--white)",
            fontSize: "20px",
          },
        }}
        value={tabValue}
        onChange={handleChange}
        aria-label="tabs example"
      >
        <Tab
          sx={{
            "&.Mui-selected": {
              color: "var(--orange)",
              fontSize: "20px",
            },
          }}
          label="Videos"
          value={0}
        />
        <Tab
          sx={{
            "&.Mui-selected": {
              color: "var(--orange)",
              fontSize: "20px",
            },
          }}
          label="Shorts"
          value={1}
        />
      </Tabs>
      {tabValue === 0 && <VideoTab />}
      {tabValue === 1 && <ShortTab />}
    </div>
  );
}

export default MyVideoTabs;
