export default class NotificationMessage {
  static shownNotification = null;
  _element;

  constructor(message = '', { duration = 1000, type = 'success' } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get element() {
    return this._element;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    this._element = element.firstElementChild;
  }

  createTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:${this.durationInSeconds}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  setShownNotification() {
    if (NotificationMessage.shownNotification) {
      NotificationMessage.shownNotification.destroy();
    }
    NotificationMessage.shownNotification = this;
  }

  show(targetElement = document.body) {
    this.setShownNotification();
    targetElement.append(this._element);

    this.timer = setTimeout(() => this.destroy(), this.duration);
  }

  get durationInSeconds() {
    return this.duration / 1000;
  }

  remove() {
    this._element.remove();
  }

  destroy() {
    this.remove();
    clearTimeout(this.timer);
  }
}
