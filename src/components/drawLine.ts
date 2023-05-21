export const drawLine = (columnWidths: number[], startSymbol: string, middleSymbol: string, endSymbol: string) => {
  console.log(`${startSymbol}${'─'.repeat(columnWidths[0] + 2)}${middleSymbol}${'─'.repeat(columnWidths[1] + 2)}${middleSymbol}${'─'.repeat(columnWidths[2] + 2)}${middleSymbol}${'─'.repeat(columnWidths[3] + 2)}${endSymbol}`);
};
