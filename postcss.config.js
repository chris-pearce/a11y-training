module.exports = ctx => ({
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-import': {},
    'postcss-simple-vars': {},
    'postcss-preset-env': { stage: 0 },
    'postcss-csso': ctx.env === 'production' ? {} : false,
  },
});
