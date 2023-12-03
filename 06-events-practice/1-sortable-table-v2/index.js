import SortableTableBase from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableBase {
  constructor(headerConfig, {
    data = [],
    sorted = {}
  } = {}) {
    const sortedData = sorted.id ? SortableTableBase.sortData(headerConfig, data, sorted.id, sorted.order) : data;

    super(headerConfig, sortedData);
    this.sorted = sorted;

    this.updateHeaderCellsDatasetOrder();
    this.addEventListeners();
  }

  updateHeaderCellsDatasetOrder() {
    const { header } = this.subElements;
    header.querySelectorAll('[data-id]').forEach(({dataset}) => {
      if (dataset.id === this.sorted.id && dataset.sortable === 'true') {
        dataset.order = this.sorted.order;
      } else {
        delete dataset.order;
      }
    });
  }

  updateSortedId(id) {
    this.sorted.id = id;
  }

  toggleSortedOrder() {
    this.sorted.order = this.sorted.order === 'asc' ? 'desc' : 'asc';
  }

  sort(id) {
    this.updateSortedId(id);
    this.toggleSortedOrder();
    super.sort(id, this.sorted.order);
    this.updateHeaderCellsDatasetOrder();
  }

  handleHeaderClick = ({ target }) => {
    const { id, sortable } = target.closest('[data-id]').dataset;
    if (sortable === 'false') {
      return;
    }
    this.sort(id);
  }

  addEventListeners() {
    const { header } = this.subElements;
    header.addEventListener('pointerdown', this.handleHeaderClick);
  }

  removeEventListeners() {
    const { header } = this.subElements;
    header.removeEventListener('pointerdown', this.handleHeaderClick);
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}
