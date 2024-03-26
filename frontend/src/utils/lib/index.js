Object.defineProperty(exports, '__esModule', {
  value: true,
});
// const _iconsManifest = require('./iconsManifest');

Object.keys(_iconsManifest).forEach((key) => {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _iconsManifest[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconsManifest[key];
    },
  });
});
const _iconBase = require('./iconBase');

Object.keys(_iconBase).forEach((key) => {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _iconBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconBase[key];
    },
  });
});
const _iconContext = require('./iconContext');

Object.keys(_iconContext).forEach((key) => {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _iconContext[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iconContext[key];
    },
  });
});
