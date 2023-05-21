export const getColumnWidths = (data: any[]): number[] => {
  const columnWidths = [4, 4, 10, 9];
  data.forEach(row => {
    row.forEach((cell: string, i: number) => {
      columnWidths[i] = Math.max(columnWidths[i], cell.length);
    });
  });
  return columnWidths;
};
