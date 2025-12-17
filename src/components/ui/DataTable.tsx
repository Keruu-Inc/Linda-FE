import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./DataTable.module.css";

export type ColumnAlign = "left" | "right" | "center";

export interface Column<T> {
  id: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  minWidth?: number;
  width?: number;
  align?: ColumnAlign;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  getRowId: (row: T) => string;
}

export function DataTable<T>({
  columns,
  rows,
  onRowClick,
  getRowId,
}: DataTableProps<T>) {
  const getCellStyle = (column: Column<T>) => {
    const style: React.CSSProperties = {};
    if (column.width) {
      style.width = `${column.width}px`;
      style.minWidth = `${column.width}px`;
    }
    if (column.align) {
      style.textAlign = column.align;
    }
    return style;
  };

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table
        className={styles.table}
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0 12px",
        }}
      >
        <TableHead>
          <TableRow className={styles.headerRow}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                className={styles.headerCell}
                style={getCellStyle(column)}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={getRowId(row)}
              className={styles.dataRow}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={styles.dataCell}
                  style={getCellStyle(column)}
                >
                  {column.render
                    ? column.render(row)
                    : ((row as Record<string, unknown>)[
                        column.id
                      ] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
