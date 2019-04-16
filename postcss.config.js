const { pxToEm, pxToRem, tokens } = require('./src/assets/css/config');

module.exports = ctx => ({
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-import': {},
    'postcss-functions': {
      functions: {
        em: pxToEm,
        rem: pxToRem,
      },
    },
    'postcss-simple-vars': { variables: tokens },
    'postcss-preset-env': { stage: 0 },
    'postcss-csso': ctx.env === 'production' ? {} : false,
  },
});
