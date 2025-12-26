import { Grid, Box } from "@mui/material";
import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";

export function PersonalInfoTab(data: any) {
    return (
        <Box sx={{ p: 0 }}>
            <Grid container spacing={2}>
                {/* LEFT COLUMN */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Grid container spacing={2} direction="column">
                        <Grid >
                            <InfoCard
                                title="User Details"
                                onEdit={() => console.log("Edit User Details")}
                            >
                                <InfoRow label="Full Name:" value="Olivia Davis" />
                                <InfoRow label="Gender:" value="Female" />
                                <InfoRow
                                    label="Date of Birth:"
                                    value="03/14/1980 (45 years)"
                                />
                                <InfoRow
                                    label="Address:"
                                    value="123 Maple Street, Springfield, IL, 62704"
                                />
                                <InfoRow
                                    label="Phone Number:"
                                    value="+1 (555) 489-4598"
                                />
                                <InfoRow label="Email:" value="—" />
                            </InfoCard>
                        </Grid>

                        <Grid >
                            <InfoCard title="Account Details">
                                <InfoRow
                                    label="Date Created (Account):"
                                    value="08/21/2025"
                                />
                            </InfoCard>
                        </Grid>
                    </Grid>
                </Grid>

                {/* MIDDLE COLUMN */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Grid container spacing={2} direction="column">
                        <Grid >
                            <InfoCard
                                title="№1 Alternative Contact"
                                onEdit={() => console.log("Edit Alt Contact 1")}
                            >
                                <InfoRow label="Full Name:" value="Klara Smith" />
                                <InfoRow
                                    label="Phone Number:"
                                    value="+1 (555) 987-6543"
                                />
                                <InfoRow label="Relationship:" value="Sister" />
                                <InfoRow label="Email:" value="—" />
                                <InfoRow
                                    label="Main point of contact:"
                                    value="Yes"
                                />
                            </InfoCard>
                        </Grid>

                        <Grid >
                            <InfoCard
                                title="№2 Alternative Contact"
                                onEdit={() => console.log("Edit Alt Contact 2")}
                            >
                                <InfoRow label="Full Name:" value="—" />
                                <InfoRow label="Phone Number:" value="—" />
                                <InfoRow label="Relationship:" value="—" />
                                <InfoRow
                                    label="Main point of contact:"
                                    value="—"
                                />
                            </InfoCard>
                        </Grid>
                    </Grid>
                </Grid>

                {/* RIGHT COLUMN */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Grid container spacing={2} direction="column">
                        <Grid >
                            <InfoCard
                                title="Coverage & User"
                                onEdit={() => console.log("Edit Coverage")}
                            >
                                <InfoRow label="Payer Type:" value="—" />
                                <InfoRow label="Referral Source:" value="—" />
                                <InfoRow label="User Date:" value="09/02/2024" />
                            </InfoCard>
                        </Grid>

                        <Grid >
                            <InfoCard
                                title="Contact Method*"
                                onEdit={() => console.log("Edit Contact Method")}
                            >
                                <InfoRow
                                    label="Priority:"
                                    value="Main POC – 1, Other POC – 2, Repeat 2X"
                                />
                                <InfoRow
                                    label="Method:"
                                    value="Program Method"
                                />
                            </InfoCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
