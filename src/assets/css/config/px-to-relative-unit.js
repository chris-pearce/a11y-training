const rootFontSizes = require('./root-font-sizes');

const pxToRelativeUnit = (px, unit, root) =>
  `${Number((px / root).toFixed(2))}${unit}`;

const pxToEm = px => pxToRelativeUnit(px, 'em', rootFontSizes.browser);
const pxToRem = px => pxToRelativeUnit(px, 'rem', rootFontSizes.app);

module.exports = {
  pxToEm,
  pxToRem,
};
