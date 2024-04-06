function runForAllNodes(node, fn) {
    if (node.type === 'ELEMENT') {
        fn(node);
        node.children.forEach(child => runForAllNodes(child, fn));
    }
}
function getAllAttributes(html) {
    const attributes = [];
    runForAllNodes(html, node => {
        attributes.push(...Object.keys(node.styles));
    });
    return [...new Set(attributes)];
}
export function applyDefaults(html) {
    const attributes = getAllAttributes(html);
    const defaultStyles = Object.fromEntries(attributes.map(e => [e, 'initial']));
    runForAllNodes(html, node => {
        node.styles = Object.assign(Object.assign({}, defaultStyles), node.styles);
    });
    return html;
}
