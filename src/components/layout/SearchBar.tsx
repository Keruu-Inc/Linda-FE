import { InputAdornment, TextField } from "@mui/material";
import styles from "./SearchBar.module.css";
import { SearchOutlined } from "@mui/icons-material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search only by an ID and User Name",
}: SearchBarProps) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.searchBar}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "48px",
        },
      }}
      slotProps={{
        input: {
          className: styles.searchBarInput,
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
