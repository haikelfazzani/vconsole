import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";

let opts = {
  cursorOffset: -1,
  rangeStart: 0,
  rangeEnd: Infinity,
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  trailingComma: "none",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  insertPragma: false,
  requirePragma: false,
  semi: true
};

export default function prettierBeautify (data) {
  return prettier.format(data, {
    parser: "babel",
    plugins: [babylon],
    ...opts
  });
}