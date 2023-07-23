module.exports = {
  extends: [require.resolve("@umijs/lint/dist/config/eslint")],
  rules: {
    "no-console": 0, // 使用console.log
    "no-var": 2, // 禁用var，用let和const代替
    "react/no-array-index-key": 0, // 可以使用index作为key, 但是只能是展示列表的时候使用
    semi: [2, "always"], // 语句强制分号结尾
    "@typescript-eslint/no-unused-expressions": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "no-param-reassign": 0,
  },
};
