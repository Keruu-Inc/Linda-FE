import { useState, useEffect } from "react";
import { Tabs, Tab, Select, MenuItem, Box, type TabsProps } from "@mui/material";
import styles from "./TabsComponent.module.css";

export interface TabItem {
  value: string;
  label: string;
}

interface TabsComponentProps extends Omit<TabsProps, "onChange"> {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  tabsClassName?: string;
  tabClassName?: string;
  selectedTabClassName?: string;
  hideIndicator?: boolean;
  simple?: boolean;
}

export function TabsComponent({
  tabs,
  value,
  onChange,
  tabsClassName,
  tabClassName,
  selectedTabClassName,
  hideIndicator = false,
  simple = false,
  ...tabsProps
}: TabsComponentProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile && !simple && tabs.length > 2) {
    return (
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.mobileSelect}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: 'background.paper',
              marginTop: '4px',
              borderRadius: '24px',
              '& .MuiMenuItem-root': {
                paddingY: '12px',
                fontSize: '14px',
              },
            },
          },
          MenuListProps: {
            sx: {
              padding: 0,
              backgroundColor: '#fff',
            },
          },
       }}
      >
        {tabs.map((tab) => (
          <MenuItem
            key={tab.value}
            value={tab.value}
            className={`${styles.menuItem} ${value === tab.value ? styles.selectedMenuItem : ""}`}
            sx={{

            }}
          >
            {tab.label}
          </MenuItem>
        ))}
      </Select>
    );
  }

  if (simple) {
    return (
      <Box className={styles.simpleTabsWrapper}>
        <Tabs
          value={value}
          onChange={(_, newValue) => onChange(newValue)}
          className={styles.simpleTabs}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={false}
          {...tabsProps}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              className={styles.simpleTab}
            />
          ))}
        </Tabs>
      </Box>
    );
  }

  return (
    <Tabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      className={tabsClassName}
      sx={{
        borderBottom: '1px solid #f4f4f4',
        "& .MuiTabs-flexContainer": {
          columnGap: undefined,
        },
      }}
      slotProps={
        hideIndicator
          ? { indicator: { sx: { display: "none" } } }
          : undefined
      }
      {...tabsProps}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          className={`${tabClassName || ""} ${value === tab.value ? selectedTabClassName || "" : ""}`.trim()}
        />
      ))}
    </Tabs>
  );
}
