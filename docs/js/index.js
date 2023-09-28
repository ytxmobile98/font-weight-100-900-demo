'use strict';

const root = document.getElementById('root');
const domParser = new DOMParser();

const fontWeights = {
    100: 'Thin',
    200: 'Extra Light',
    300: 'Light',
    400: 'Regular',
    500: 'Medium',
    600: 'Semi Bold',
    700: 'Bold',
    800: 'Extra Bold',
    900: 'Black',
};

const demoText = {
    English: 'The quick brown fox jumps over the lazy dog.',
    Chinese: '敏捷的棕色狐狸跃过懒狗。',
};

const fontFamiliesByGroup = [
    ['sans-serif'],
    ['Noto Sans', 'sans-serif'],
    ['Noto Sans', 'Noto Sans CJK SC', 'sans-serif'],
]

/**
 * Render single block, with font weights 100~900.
 * @param {string} header header text.
 * @param {string[]} fontFamilies font families.
 */
function renderSingleBlock(header, fontFamilies) {
    const blockText =
        `<div class="block">
            <h1 class="block__header">${header}</h1>
            <ul class="block__demo-texts">
                ${Object.entries(fontWeights)
                    .map(([weight, name]) =>
                        `<li class="block__single-demo">
                            <p class="block__font-weight-name">${weight} ${name}</p>
                            <p class="block__demo-text"
                                style="font-family: ${fontFamilies.join(', ')};
                                    font-weight: ${weight};"
                                >${demoText.English}<br/>${demoText.Chinese}</p>
                        </li>`)
                    .join('')}
            </ul>
         </div>`;

    const body = domParser.parseFromString(blockText, 'text/html').body;
    return body;
}

/**
 * Render all blocks.
 * @param {HTMLElement} root root element.
 */
function renderAllBlocks(root) {
    const blocks = fontFamiliesByGroup.map(
        families => {
            const header = families.join(' + ');
            return renderSingleBlock(header, families);
        }
    );

    root.append(...blocks);
}

document.addEventListener('DOMContentLoaded', () => renderAllBlocks(root));