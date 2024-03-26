/* eslint-disable no-void */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable no-multi-assign */
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.IconContext = exports.DefaultContext = void 0;
const _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DefaultContext = exports.DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};
const IconContext = exports.IconContext = _react.default.createContext && /* #__PURE__ */_react.default.createContext(DefaultContext);
