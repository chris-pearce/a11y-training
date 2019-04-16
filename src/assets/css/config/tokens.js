const { pxToRem } = require('./px-to-relative-unit');
const rootFontSizes = require('./root-font-sizes');

const shared = {
  spacingDefault: rootFontSizes.app,
  typographySizeDefault: rootFontSizes.app,
};

module.exports = Object.freeze({
  'color-body-copy': '#222',
  'color-white': 'white',
  'color-blue-default': 'mediumblue',
  'color-blue-light1x': 'lightblue',
  'color-blue-light2x': 'aliceblue',
  'spacing-default': pxToRem(shared.spacingDefault),
  'spacing-large1x': pxToRem(shared.spacingDefault + 8),
  'spacing-large2x': pxToRem(shared.spacingDefault + 16),
  'spacing-large3x': pxToRem(shared.spacingDefault + 24),
  'spacing-large4x': pxToRem(shared.spacingDefault + 52),
  'spacing-small1x': pxToRem(shared.spacingDefault - 4),
  'spacing-small2x': pxToRem(shared.spacingDefault - 8),
  'spacing-small3x': pxToRem(shared.spacingDefault - 12),
  'typography-family': 'system-ui, sans-serif',
  'typography-size-default': `${shared.typographySizeDefault /
    rootFontSizes.browser}rem`,
  'typography-size-large1x': pxToRem(shared.typographySizeDefault + 4),
  'typography-size-large2x': pxToRem(shared.typographySizeDefault + 8),
  'typography-size-large3x': pxToRem(shared.typographySizeDefault + 12),
  'typography-size-large4x': pxToRem(shared.typographySizeDefault + 22),
  'typography-size-small1x': pxToRem(shared.typographySizeDefault - 2),
  'typography-size-small2x': pxToRem(shared.typographySizeDefault - 4),
  'typography-size-small3x': pxToRem(shared.typographySizeDefault - 6),
  'typography-size-small4x': pxToRem(shared.typographySizeDefault - 12),
});
