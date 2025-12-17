import { Box } from "@mui/material";
import { TabsComponent, type TabItem } from "../ui/TabsComponent";
import styles from "../ui/TabsComponent.module.css";

export type ProfileTabValue = "discharged" | "re-certified" | "archived";

interface ProfileTabsProps {
  value: ProfileTabValue;
  onChange: (value: ProfileTabValue) => void;
}

const profileTabs: TabItem[] = [
  { value: "discharged", label: "Discharged" },
  { value: "re-certified", label: "Re-Certified" },
  { value: "archived", label: "Archived" },
];

export function ProfileTabs({ value, onChange }: ProfileTabsProps) {
  return (
    <Box >
      <TabsComponent
        tabs={profileTabs}
        value={value}
        onChange={(newValue) => onChange(newValue as ProfileTabValue)}
        tabsClassName={styles.tabs}
        tabClassName={styles.tab}
        selectedTabClassName={styles.selected}
        hideIndicator={true}
      />
    </Box>
  );
}
