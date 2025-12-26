import type { ReactNode } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    IconButton
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export interface InfoCardProps {
    /** Card title shown in header */
    title: string;

    /** Optional edit handler (shows edit icon when provided) */
    onEdit?: () => void;

    /** Card content (InfoRow, custom rows, etc.) */
    children: ReactNode;

    /** Disable padding if needed for custom layouts */
    disablePadding?: boolean;
}

export function InfoCard({ title, onEdit, children }: InfoCardProps) {
    return (
        <Card
            elevation={1}
            sx={{
                borderRadius: "12px",
                height: "100%",
                padding: '16px',
                border: '1px solid #EDF0F6',
                boxShadow: "0px 2px 20px rgba(214, 212, 240, 0.3)",
            }}
        >
            <CardHeader
                title={title}
                sx={
                    {
                        borderBottom: '1px solid #EDF0F6',
                        padding: 0,
                        paddingBottom: '12px',

                    }
                }
                titleTypographyProps={
                    {
                        fontSize: "15px",
                        fontWeight: 600,
                    }
                }
                action={
                    onEdit && (
                        <IconButton size="small" onClick={onEdit} sx={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '16px',
                            backgroundColor: '#F4F7FD',

                        }}>
                            <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                    )
                }
            />
            <CardContent sx={{ p: 0, pt: "12px" }}>
                {children}
            </CardContent>
        </Card>
    );
}
