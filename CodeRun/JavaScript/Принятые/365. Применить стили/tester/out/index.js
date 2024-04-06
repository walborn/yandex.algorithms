import { convert } from './convert.js';
import { applyDefaults } from './utils.js';
import apply from './main.js';
import { css, html } from './defaults.js';
const onDomContentLoaded = () => {
    const htmlInput = document.querySelector('#htmlInput');
    const cssInput = document.querySelector('#cssInput');
    const referenceOutput = document.querySelector('.referenceOutput');
    const scriptOutput = document.querySelector('.scriptOutput');
    referenceOutput.attachShadow({ mode: 'open' });
    scriptOutput.attachShadow({ mode: 'open' });
    htmlInput.value = JSON.stringify(html, null, 4);
    cssInput.value = JSON.stringify(css, null, 4);
    const onInput = () => {
        try {
            const newHtml = JSON.parse(htmlInput.value);
            const newCss = JSON.parse(cssInput.value);
            referenceOutput.shadowRoot.innerHTML = convert(newHtml, newCss);
            const scriptResult = apply(newHtml, newCss);
            scriptOutput.shadowRoot.innerHTML = convert(applyDefaults(scriptResult), []);
        }
        catch (_a) {
        }
    };
    onInput();
    htmlInput.addEventListener('input', onInput);
    cssInput.addEventListener('input', onInput);
};
document.addEventListener('DOMContentLoaded', onDomContentLoaded);
