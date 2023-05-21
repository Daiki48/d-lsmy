export const getTargetDir = (args: string[]): string => {
  return args.find(arg => arg !== '-a') || process.cwd();
};
