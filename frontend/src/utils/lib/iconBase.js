/* eslint-disable no-sequences */
/* eslint-disable no-loop-func */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-spread */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-continue */
/* eslint-disable no-func-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.GenIcon = GenIcon;
exports.IconBase = IconBase;
const _react = _interopRequireDefault(require('react'));
const _iconContext = require('./iconContext');

const _excluded = ['attr', 'size', 'title'];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {}; const target = _objectWithoutPropertiesLoose(source, excluded); let key; let
    i; if (Object.getOwnPropertySymbols) { const sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {}; const target = {}; const sourceKeys = Object.keys(source); let key; let
    i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target;
}
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { const t = Object.keys(e); if (Object.getOwnPropertySymbols) { let o = Object.getOwnPropertySymbols(e); r && (o = o.filter((r) => Object.getOwnPropertyDescriptor(e, r).enumerable)), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (let r = 1; r < arguments.length; r++) { var t = arguments[r] != null ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach((r) => { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((r) => { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key); if (key in obj) {
    Object.defineProperty(obj, key, {
      value, enumerable: true, configurable: true, writable: true,
    });
  } else { obj[key] = value; } return obj;
}
function _toPropertyKey(arg) { const key = _toPrimitive(arg, 'string'); return typeof key === 'symbol' ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== 'object' || input === null) return input; const prim = input[Symbol.toPrimitive]; if (prim !== undefined) { const res = prim.call(input, hint || 'default'); if (typeof res !== 'object') return res; throw new TypeError('@@toPrimitive must return a primitive value.'); } return (hint === 'string' ? String : Number)(input); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* #__PURE__ */_react.default.createElement(node.tag, _objectSpread({
    key: i,
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  // eslint-disable-next-line react/display-name
  return (props) => /* #__PURE__ */_react.default.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr),
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  const elem = (conf) => {
    const {
      attr,
      size,
      title,
    } = props;
    const svgProps = _objectWithoutProperties(props, _excluded);
    const computedSize = size || conf.size || '1em';
    let className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? `${className} ` : '') + props.className;
    return /* #__PURE__ */_react.default.createElement('svg', _extends({
      stroke: 'currentColor',
      fill: 'currentColor',
      strokeWidth: '0',
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color,
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: 'http://www.w3.org/2000/svg',
    }), title && /* #__PURE__ */_react.default.createElement('title', null, title), props.children);
  };
  return _iconContext.IconContext !== undefined ? /* #__PURE__ */_react.default.createElement(_iconContext.IconContext.Consumer, null, (conf) => elem(conf)) : elem(_iconContext.DefaultContext);
}
