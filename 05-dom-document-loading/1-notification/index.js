let instance = null;

export default class NotificationMessage {
  _element;
  #isNotificationShown = false;

  constructor(message = '', { duration = 1000, type = 'success' } = {}) {
    const self = instance ?? this;

    self.message = message;
    self.duration = duration;
    self.type = type;

    if (!instance || (instance && !instance.#isNotificationShown)) {
      self.render();
    }

    instance = self;
    return self;
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

  show(targetElement) {
    if (this.#isNotificationShown) {
      this.destroy();
      this.render();
    }

    (targetElement ?? document.body).append(this._element);

    this.#isNotificationShown = true;

    this.timer = setTimeout(() => {
      this.destroy();
      this.#isNotificationShown = false;
    }, this.duration);
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
