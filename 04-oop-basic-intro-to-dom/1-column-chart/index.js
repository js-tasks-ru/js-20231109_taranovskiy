export default class ColumnChart {
  _chartHeight = 50;
  _element;

  constructor({ data = [], label = '', link = '', value = 0, formatHeading = null } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;

    this.render();
  }

  get element() {
    return this._element;
  }

  get chartHeight() {
    return this._chartHeight;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    this._element = element.firstElementChild;

    if (this.dataIsEmpty) {
      this.setLoadingState();
    }
  }

  update(newData) {
    this.data = newData;
    this.remove();
    this.render();
  }

  createTemplate() {
    return `
      <div id="${this.label}" class="dashboard__chart_${this.label}">
        <div class="column-chart" style="--chart-height: ${this._chartHeight}">
          <div class="column-chart__title">
            Total&nbsp;${this.label}
            <a href="${this.link}" class="column-chart__link">View all</a>
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.formatHeading?.(this.value) ?? this.value}</div>
            <div data-element="body" class="column-chart__chart">
              ${this.processedData.map(({value, percent}) => `<div style="--value: ${value}" data-tooltip="${percent}"></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  get dataIsEmpty() {
    return !this.data.length;
  }

  get processedData() {
    const maxValue = Math.max(...this.data);
    const scale = this._chartHeight / maxValue;

    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  setLoadingState() {
    this._element.classList.add('column-chart_loading');
  }

  remove() {
    this._element.remove();
  }

  destroy() {
    this.remove();
  }
}
