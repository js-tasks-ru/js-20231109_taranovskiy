export default class DoubleSlider {
  _element;

  constructor({
    min = 100,
    max = 200,
    formatValue = value => '$' + value,
    selected: {
      from,
      to,
    } = {}
  } = {}) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = { from, to };

    this.createElement();
    this.setThumbPosition();
  }

  get element() {
    return this._element;
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();

    this._element = element.firstElementChild;
  }

  get formattedValue() {
    return {
      from: this.selected.from ? this.formatValue(this.selected.from) : this.formatValue(this.min),
      to: this.selected.to ? this.formatValue(this.selected.to) : this.formatValue(this.max),
    };
  }

  createTemplate() {
    return `
      <div class="range-slider">
        <span data-element="from">${this.formattedValue.from}</span>
        <div class="range-slider__inner">
          <span class="range-slider__progress"></span>
          <span class="range-slider__thumb-left"></span>
          <span class="range-slider__thumb-right"></span>
        </div>
        <span data-element="to">${this.formattedValue.to}</span>
      </div>
    `;
  }

  setThumbPosition() {
    const { leftThumb, rightThumb, progress } = this.getThumbs();
    const { left, right } = this.getProgress();

    leftThumb.style.left = `${left}%`;
    rightThumb.style.right = `${right}%`;
    progress.style.left = `${left}%`;
    progress.style.right = `${right}%`;
  }

  getThumbs() {
    const leftThumb = this.element.querySelector('.range-slider__thumb-left');
    const rightThumb = this.element.querySelector('.range-slider__thumb-right');
    const progress = this.element.querySelector('.range-slider__progress');

    return { leftThumb, rightThumb, progress };
  }

  getProgress() {
    const { from, to } = this.selected;
    const { min, max } = this;
    const left = (from - min) / (max - min) * 100;
    const right = (max - to) / (max - min) * 100;

    return { left, right };
  }

  remove() {
    this._element.remove();
  }

  destroy() {
    this.remove();
  }
}
