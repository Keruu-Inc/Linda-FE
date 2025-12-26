import { Box } from '@mui/material'
import { DataTable, type Column } from '@/components/ui/DataTable';
import type { Report } from '../../types'

export interface ReportsTabProps {
    rows: Report[];
    columns: Column<Report>[];

}

const ReportsTab = (
    { rows: reports,
        columns: reportsColumns,
    }: ReportsTabProps
) => {
    return (
        <Box>
            <DataTable
                columns={reportsColumns}
                rows={reports}
                getRowId={(report: Report) => report.id}
            />
        </Box>
    )
}

export default ReportsTab