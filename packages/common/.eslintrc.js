module.exports = {
  extends: [require.resolve('@ccs/config-umi/eslint')],
  // extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
};
