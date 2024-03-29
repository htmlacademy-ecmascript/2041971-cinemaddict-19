import AbstractView from '../framework/view/abstract-view.js';

function createFilmsListTemplate(isExtra, title) {
  return `<section class="films-list ${isExtra ? 'films-list films-list--extra' : ''}">
    <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title || 'All movies. Upcoming'}</h2>
    <div class="films-list__container"></div>
  </section>`;
}

export default class FilmsListView extends AbstractView{
  #isExtra = null;
  #title = null;

  constructor(isExtra, title) {
    super();
    this.#isExtra = isExtra;
    this.#title = title;
  }

  get template() {
    return createFilmsListTemplate(this.#isExtra, this.#title);
  }
}
