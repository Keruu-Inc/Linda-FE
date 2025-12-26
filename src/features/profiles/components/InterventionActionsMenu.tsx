import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    MoreVert as MoreVertIcon,
    DoneAllOutlined,
    DeleteOutline,
} from "@mui/icons-material";
import { useState } from "react";
import styles from "./PatientsActionsMenu.module.css";


interface InterventionActionsMenuProps {
    onActionClick: (action: string) => void;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

export function InterventionActionsMenu({
    onActionClick,
    isOpen,
    onOpen,
    onClose,
}: InterventionActionsMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Control open state from parent if provided
    const open = typeof isOpen === 'boolean' ? isOpen : Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        if (onOpen) onOpen();
    };

    const handleClose = () => {
        setAnchorEl(null);
        if (onClose) onClose();
    };

    const handleAction = (action: string) => {
        if (action) {
            onActionClick(action);
            handleClose();
        } else {
            handleClose();
        }
    };

    return (
        <>
            <IconButton
                size="small"
                onClick={handleClick}
                className={isOpen ? styles.actionButtonActive : styles.actionButton}
            >
                <MoreVertIcon className={styles.dotsIcon} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={styles.menu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                slotProps={{
                    paper: {
                        className: styles.menuPaper,
                        sx: {
                            minHeight: "136px !important",
                        }
                    },
                }}
            >
                <MenuItem
                    onClick={() => handleAction("completed")}
                    className={styles.menuItem}
                >
                    <ListItemIcon>
                        <DoneAllOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Move to Completed</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => handleAction("notRelevant")}
                    className={styles.menuItem}
                >
                    <ListItemIcon>
                        <DeleteOutline fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Move to Not Relevant</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
