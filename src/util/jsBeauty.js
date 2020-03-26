const jsBeautyOptions = {
  e4x: true,
  'brace_style': 'preserve-inline',
  'break_chained_methods': true,
  'detect_packers': true
};

export default function jsBeauty (data) {
  return window.js_beautify(data, jsBeautyOptions);
}