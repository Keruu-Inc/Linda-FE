import type { Report } from "../types";

export const mockReports: Report[] = [
    {
        id: "1",
        date: "2025-10-15",
        time: "15:05:45",
        callingProgram: "Post Discharge Day 14",
        status: "Completed",
    },
    {
        id: "2",
        date: "2025-10-15",
        time: "15:11:45",
        callingProgram: "Post Discharge Day 30",
        status: "Partial",
        hasNotification: true,
    },
    {
        id: "3",
        date: "2025-10-15",
        time: "15:12:30",
        callingProgram: "Post Discharge Day 60",
        status: "Completed",
    },
];
