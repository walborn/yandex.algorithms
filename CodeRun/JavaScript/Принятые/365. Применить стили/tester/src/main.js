// Не забудьте перед отправкой изменить в module.exports = function(html, css) {
export default function(html, css) {
  // html.styles.color = 'rgb(0, 255, 0)';
  // html.children[1].styles.color = 'rgb(255, 0, 0)';

  // html.styles["font-size"] = '15px';
  // html.children[1].styles["font-size"] = '15px';

  for (const { selector, declaration } of css)
  return html;
}
