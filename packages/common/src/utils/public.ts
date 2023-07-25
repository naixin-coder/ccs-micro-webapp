/**
 * 数值转换为以w为单位的数字
 * @param val 值
 * @returns
 */
function unitNumFn(val: number) {
  const UNIT_VALUE = 10000;
  if (!val) return 0;
  const result = val / UNIT_VALUE;
  return `${result}`;
}
export { unitNumFn };
