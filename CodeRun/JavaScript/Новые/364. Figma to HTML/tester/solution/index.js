const TEXT_STYLES_MAPPER = {
  fontFamily: (value) => `font-family: ${value}`,
  fontSize: (value) => `font-size: ${value}px;`,
  fontWeight: (value) => `font-weight: ${value};`,
  textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
  textAlignVertical: (value) => `vertical-align: ${value.toLowerCase()};`,
  letterSpacing: (value) => `letter-spacing: ${value};`,
  lineHeightPx: (value) => `line-height: ${value}px;`,
  lineHeightPercent: (value) => `line-height: ${value}%;`,
}

const buildBlock = ({ type, content, className, style }) =>
  `<${type} class="${className}" style="${style}">${content}</${type}>`

const getTextStyles = ({ style }) => Object.entries(style || {})
  .map(([ key, value ]) => TEXT_STYLES_MAPPER[key]?.(value))
  .filter(Boolean).join(' ')


const PRIMITIVES = {
  TEXT: (node) => buildBlock({
    type: 'span',
    content: node.characters,
    className: node.type,
    style: getTextStyles(node),
  })
}

const parse = (entry) => traverse(entry.children[0])

const traverse = (node) => {
  // тут надо придумать, как обходить дерево:)
  return PRIMITIVES[node.type](node);
}

module.exports = function (json) {
  const entry = json.document.children[0]
  return parse(entry)
}
