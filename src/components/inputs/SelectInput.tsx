import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import type { ReactNode } from "react";
import styles from "./SelectInput.module.css";

export interface SelectInputOption<T extends string> {
    value: T;
    label: string;
}

export interface SelectInputProps<T extends string> {
    label: string;
    value: T;
    options: SelectInputOption<T>[];
    onChange: (value: T) => void;
    icon?: ReactNode;
}

import { useState } from "react";

export function SelectInput<T extends string>({
    label,
    value,
    options,
    onChange,
    icon,
}: SelectInputProps<T>) {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((o) => o.value === value);

    return (
        <FormControl>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                displayEmpty
                IconComponent={ExpandMore}
                className={[
                    styles.select,
                    open ? styles.open : ""
                ].join(" ")}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                renderValue={() => (
                    <Box className={styles.trigger}>
                        <Box className={styles.labelContainer}>
                            {icon}
                            <Typography className={styles.label}>
                                {label}
                            </Typography>
                        </Box>
                        <Typography className={styles.value}>
                            {selectedOption?.label}
                        </Typography>
                    </Box>
                )}
                MenuProps={{
                    slotProps: {
                        paper: {
                            sx: {
                                mt: 1,
                            },
                        },
                    },
                    PaperProps: {
                        className: styles.menuPaper,
                    },
                }}
            >
                {options.map((option) => {
                    const selected = option.value === value;
                    return (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            className={selected ? styles.menuItemSelected : styles.menuItem}
                        >
                            <Box style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Typography
                                    className={selected ? styles.menuItemSelected : undefined}
                                >
                                    {option.label}
                                </Typography>
                                {selected && <CheckIcon className={styles.checkIcon} />}
                            </Box>
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
