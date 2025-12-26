import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

export interface InfoRowProps {
    label: string;
    value?: ReactNode;
}

export function InfoRow({ label, value }: InfoRowProps) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                columnGap: 2,
                py: 0.75,
                alignItems: "start",
            }}
        >
            <Typography
                variant="body2"
                color="#7F889A"
                fontWeight={400}
                fontSize={15}
                sx={{ lineHeight: 1.4 }}
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={400}
                fontSize={15}
                color="#33333F"
                sx={{
                    lineHeight: 1.4,
                    wordBreak: "break-word",
                }}
            >
                {value || "—"}
            </Typography>
        </Box>
    );
}
