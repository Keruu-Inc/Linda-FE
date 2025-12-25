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
  return (
    <Tabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      className={tabsClassName}
      sx={
        {
          borderBottom: simple ? "none" : '1px solid #f4f4f4',
          "& .MuiTabs-flexContainer": {
            columnGap: simple ? "32px" : undefined,
          },
        }
      }

      slotProps={
        simple
          ? {
            indicator: {
              sx: {
                backgroundColor: "#716BEE",
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              },
            },
          }
          : hideIndicator
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
          className={`${tabClassName || ""} ${value === tab.value ? selectedTabClassName || "" : ""
            }`.trim()}
          sx={
            simple
              ? {
                textTransform: "none",
                color: value === tab.value ? "#33333F" : "#7F889A",
                fontWeight: 400,
                fontSize: '15px',
                "&.Mui-selected": {
                  color: "#33333F",
                },
              }
              : undefined
          }
        />
      ))}
    </Tabs>
  );
}
