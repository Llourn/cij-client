export const percentCompleted = (arr: any[] = [], iterator: number) => {
  let num = Math.floor((iterator / (arr.length - 1)) * 100);
  return num;
};
