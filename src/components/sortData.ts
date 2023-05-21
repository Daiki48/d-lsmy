export const sortData = (data: any[]): void => {
  data.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0].localeCompare(b[0]);
    } else if (a[1] === 'directory') {
      return -1;
    } else {
      return 1;
    }
  });
};
