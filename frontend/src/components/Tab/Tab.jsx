import React from "react";
import { Tab, Tabs } from "@mui/material";
import FollowersTab from "../FollowTab/FollowersTab";
import FollowingTab from "../FollowTab/FollowingTab";
import "./Tab.css";

function MyTabs({ tabValue, handleChange }) {
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
          label="Followers"
          value={0}
        />
        <Tab
          sx={{
            "&.Mui-selected": {
              color: "var(--orange)",
              fontSize: "20px",
            },
          }}
          label="Following"
          value={1}
        />
      </Tabs>
      {tabValue === 0 && <FollowersTab />}
      {tabValue === 1 && <FollowingTab />}
    </div>
  );
}

export default MyTabs;
