import { Tabs, Tab, type TabsProps } from "@mui/material";

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
}

export function TabsComponent({
  tabs,
  value,
  onChange,
  tabsClassName,
  tabClassName,
  selectedTabClassName,
  hideIndicator = false,
  ...tabsProps
}: TabsComponentProps) {
  return (
    <Tabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      className={tabsClassName}
      slotProps={
        hideIndicator
          ? {
              indicator: {
                style: { display: "none" },
              },
            }
          : undefined
      }
      {...tabsProps}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          className={`${tabClassName || ""} ${
            value === tab.value ? selectedTabClassName || "" : ""
          }`.trim()}
        />
      ))}
    </Tabs>
  );
}
