import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import styles from "./MainLayout.module.css";

export function MainLayout() {
  const [currentTab, setCurrentTab] = useState("profiles");

  return (
    <Box className={styles.layoutContainer}>
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      <Box className={styles.contentArea}>
        <Outlet />
      </Box>
    </Box>
  );
}
