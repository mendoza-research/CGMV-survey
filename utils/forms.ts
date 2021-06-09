export function inputStrToNum(strVal: string): number {
  if (typeof strVal === "undefined") {
    return 0;
  }

  const num = Number(strVal.trim());
  return Number.isNaN(num) ? 0 : num;
}
