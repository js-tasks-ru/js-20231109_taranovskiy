class Tooltip {
  _element;
  static instance;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    this.createElement();

    Tooltip.instance = this;
  }

  get element() {
    return this._element;
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    this._element = element.firstElementChild;
  }

  createTemplate() {
    return `<div class="tooltip"></div>`;
  }

  initialize () {
    this.addEventListeners();
  }

  render (text) {
    this.element.textContent = text;
    document.body.appendChild(this.element);
  }


  handlePointerOver = ({ target }) => {
    if (target.dataset?.tooltip) {
      this.render(target.dataset.tooltip);
    }
  }

  handlePointerOut = ({ target }) => {
    if (target.dataset.tooltip !== undefined) {
      this.remove();
    }
  }

  handlePointerMove = (event) => {
    const { x, y } = event;

    this.element.style.left = `${x + 10}px`;
    this.element.style.top = `${y + 10}px`;
  }

  addEventListeners() {
    document.addEventListener('pointerover', this.handlePointerOver);
    document.addEventListener('pointerout', this.handlePointerOut);
    document.addEventListener('pointermove', this.handlePointerMove);
  }

  remove() {
    this._element.remove();
  }

  destroy() {
    this.remove();
    document.removeEventListener('pointerover', this.handlePointerOver);
    document.removeEventListener('pointerout', this.handlePointerOut);
    document.removeEventListener('pointermove', this.handlePointerMove);
  }
}

export default Tooltip;
