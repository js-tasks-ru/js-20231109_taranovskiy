import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  constructor(headerConfig, {
    data = [],
    sorted = {}
  } = {}) {
    super(headerConfig, data);

    this.sorted = sorted;

    this.addHeaderEventListeners();
  }

  handleHeaderClick = ({ target }) => {
    const { id } = target.closest('[data-id]').dataset;
    this.sort(id);
  }

  addHeaderEventListeners() {
    const { header } = this.subElements;
    header.addEventListener('click', this.handleHeaderClick);
  }
}
