/**
 * Сюда необходимо вставить разметку, которая будет находиться внутри тега <body>
 * ВАЖНО! тег <body> вставлять не надо, только то, что будет внутри (включая стили)
 */
const htmlFragment = `<div style="display: inline-flex; padding: 16px; flex-direction: column;align-items: flex-start; gap: 16px;">
<div style="color: #000; font-size: 18px; font-family: Inter; line-height: 22px;">Список товаров</div>
  <div style="display: flex; align-items: flex-start; gap: 16px; align-self: stretch;">
  <div style="display: flex; padding: 16px; flex-direction: column;align-items: flex-start; gap: 16px; border-radius: 24px;background: #F8F8F8;">
    <div style="border-radius: 24px; width: 149px; height: 138px; background: #C4C4C4;"></div>
    <div style="display: flex; padding: 10px 54px; align-items: flex-end; gap: 10px;border-radius: 10px; background: #FFF; color: #000; font-size: 12px;line-height: 15px;">Купить</div>
  </div>
  <div style="display: flex; padding: 16px; flex-direction: column;align-items: flex-start; gap: 16px; border-radius: 24px;background: #F8F8F8;">
    <div style="border-radius: 24px; width: 149px; height: 138px; background: #C4C4C4;"></div>
    <div style="display: flex; padding: 10px 54px; align-items: flex-end; gap: 10px;border-radius: 10px; background: #FFF; color: #000; font-size: 12px;line-height: 15px;">Купить</div>
  </div>
  <div style="display: flex; padding: 16px; flex-direction: column;align-items: flex-start; gap: 16px; border-radius: 24px;background: #F8F8F8;">
    <div style="border-radius: 24px; width: 149px; height: 138px; background: #C4C4C4;"></div>
    <div style="display: flex; padding: 10px 54px; align-items: flex-end; gap: 10px;border-radius: 10px; background: #FFF; color: #000; font-size: 12px;line-height: 15px;">Купить</div>
  </div>
</div>
</div>`;

module.exports = function () {
    return htmlFragment;
};
