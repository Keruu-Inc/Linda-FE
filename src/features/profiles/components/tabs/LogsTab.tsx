import { Box } from '@mui/material'
import { TabsComponent, type TabItem } from "@/components/ui/TabsComponent";
import tabStyles from '@/components/ui/TabsComponent.module.css'
import { DataTable, type Column } from '@/components/ui/DataTable';
import type { Log } from '../../types'
import type { LogTabValue } from '../../pages/ProfilePage';

export interface LogsTabProps {
    rows: Log[];
    columns: Column<Log>[];
    logTabs: TabItem[];
    activeLogTab: LogTabValue;
    setActiveLogTab: (value: LogTabValue) => void;

}

const LogsTab = (
    { rows: logs,
        columns: logsColumns,
        logTabs,
        activeLogTab,
        setActiveLogTab }: LogsTabProps
) => {
    return (
        <Box >
            <Box display='flex' justifyContent='center'>
                <TabsComponent
                    tabs={logTabs}
                    value={activeLogTab}
                    onChange={(newValue) => setActiveLogTab(newValue as LogTabValue)}
                    tabsClassName={tabStyles.tabs}
                    tabClassName={tabStyles.tab}
                    selectedTabClassName={tabStyles.selected}
                    hideIndicator={true}
                />
            </Box>
            <DataTable
                columns={logsColumns}
                rows={logs}
                getRowId={(log: Log) => log.id}
            />
        </Box>
    )
}

export default LogsTab