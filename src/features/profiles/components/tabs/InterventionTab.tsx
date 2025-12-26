import { useState } from 'react';
import { Box } from '@mui/material'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { SelectInput } from '@/components/inputs/SelectInput';
import { TabsComponent, type TabItem } from "@/components/ui/TabsComponent";
import tabStyles from '@/components/ui/TabsComponent.module.css'
import { DataTable, type Column } from '@/components/ui/DataTable';
import type { Intervention } from '../../types'
import type { InterventionTabValue } from '../../pages/ProfilePage';
export interface InterventionTabProps {
    rows: Intervention[];
    columns: Column<Intervention>[];
    interventionTabs: TabItem[];
    activeInterventionTab: InterventionTabValue;
    setActiveInterventionTab: (value: InterventionTabValue) => void;
    actionMenuOpen?: boolean;
}

const types = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "notRelevant", label: "Not Relevant" },
];


const InterventionTab = ({
    rows: interventions,
    columns: interventionsColumns,
    interventionTabs,
    activeInterventionTab,
    setActiveInterventionTab,
    actionMenuOpen = false,
}: InterventionTabProps) => {
    const [selectedInterventionRowId, setSelectedInterventionRowId] = useState<string | number | null>(null);
    const [selectedType, setSelectedType] = useState(types[0]?.value);
    return (
        <Box>
            <Box
                display='flex'
                justifyContent={selectedInterventionRowId ? 'space-between' : 'center'}
                alignItems='center'
                mb={2}
            >
                <TabsComponent
                    tabs={interventionTabs}
                    value={activeInterventionTab}
                    onChange={(newValue) => setActiveInterventionTab(newValue as InterventionTabValue)}
                    tabsClassName={tabStyles.tabs}
                    tabClassName={tabStyles.tab}
                    selectedTabClassName={tabStyles.selected}
                    hideIndicator={true}
                />
                {selectedInterventionRowId && (
                    <Box ml={3} display="flex" alignItems="center" gap={2}>
                        <SelectInput
                            icon={<AssignmentOutlinedIcon sx={{ fontSize: "24px", color: "#7F889A", mr: '1px' }} />}
                            label="Type:"
                            value={selectedType}
                            options={types}
                            onChange={(newValue) => setSelectedType(newValue)}
                        />
                        {actionMenuOpen && (
                            <SelectInput
                                label="Status:"
                                value={selectedType}
                                options={types}
                                onChange={(newValue) => setSelectedType(newValue)}
                            />
                        )}
                    </Box>
                )}
            </Box>
            <Box display="flex" flexDirection="row">
                <Box flex={1}>
                    <DataTable
                        columns={interventionsColumns}
                        rows={interventions}
                        getRowId={(intervention: Intervention) => intervention.id}
                        onRowClick={(intervention) =>
                            setSelectedInterventionRowId(selectedInterventionRowId === intervention.id ? null : intervention.id)}
                        selectedRowId={selectedInterventionRowId}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default InterventionTab