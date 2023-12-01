export default class SortableTable {
  _element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.createElement();
  }

  get element() {
    return this._element;
  }

  get subElements() {
    const elements = Array.from(this._element.querySelectorAll('[data-element]'));
    return elements.reduce((accum, element) => {
      accum[element.dataset.element] = element;
      return accum;
    }, {});
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();

    this._element = element.firstElementChild;
  }

  createTemplate() {
    return `
      <div class="sortable-table">
        ${this.createHeaderTemplate()}
        ${this.createBodyTemplate()}
      </div>
    `;
  }

  createHeaderTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map(({id, title, sortable}) => `
          <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
            <span>${title}</span>
            <span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>
          </div>
        `).join('')}
      </div>
    `;
  }

  createBodyTemplate() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.data.map(({id, title, quantity, price, images, sales }) => `
            ${this.createRowTemplate({id, title, quantity, price, images, sales })}
        `).join('')}
      </div>
    `;
  }

  createRowTemplate({id, title, quantity, price, images, sales }) {
    return `
      <a href="/products/${id}" class="sortable-table__row">
        ${images?.length > 0 ? `<div class="sortable-table__cell">
          <img class="sortable-table-image" alt="${title}" src="https://via.placeholder.com/32">
        </div>` : ''}
        ${title ? `<div class="sortable-table__cell">${title}</div>` : ''}
        ${quantity ? `<div class="sortable-table__cell">${quantity}</div>` : ''}
        ${price ? `<div class="sortable-table__cell">${price}</div>` : ''}
        ${sales ? `<div class="sortable-table__cell">${sales}</div>` : ''}
      </a>
    `;
  }

  sort(field, order) {
    this.data = SortableTable.sortData(this.headerConfig, this.data, field, order);
    this.subElements.body.innerHTML = this.createBodyTemplate();
  }

  remove() {
    this._element.remove();
  }

  destroy() {
    this.remove();
  }

  static sortData(headerConfig, data, field, order) {
    const sortType = headerConfig.find(({id}) => id === field).sortType;

    switch (sortType) {
    case 'string':
      return SortableTable.sortBySymbols(data, field, order);
    case 'number':
      return SortableTable.sortByNumbers(data, field, order);
    default:
      return data;
    }
  }

  static sortBySymbols(data, field, order) {
    const dataClone = [...data];
    const collator = new Intl.Collator(['ru', 'en'], { caseFirst: 'upper' });
    const compare = (a, b) => order === 'asc' ? collator.compare(a, b) : collator.compare(b, a);
    return dataClone.sort((a, b) => compare(a[field], b[field]));
  }

  static sortByNumbers(data, field, order) {
    const dataClone = [...data];
    const compare = (a, b) => order === 'asc' ? a - b : b - a;
    return dataClone.sort((a, b) => compare(a[field], b[field]));
  }
}

