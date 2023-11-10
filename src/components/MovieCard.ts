import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

export class MovieCard extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');

    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');

    // Null is actually a string here on the homepage
    const image = imgUrl !== 'null' && imgUrl !== null ? IMAGE_BASE_URL + POSTER_SIZE + imgUrl : './no_image.jpg';

    template.innerHTML = `<div class="wrapper"><div class="inner-wrapper"><img class="thumb" src="${image}" alt="thumb" /><div class='text-wrapper'><h2 class='truncate'>${title}</h2>
    ${subtitle ? `<p class="truncate">${subtitle}</p>` : ''}
    </div></div></div><style>
.wrapper {
  height: 20rem;
}

.wrapper:hover {
  opacity: 0.8;
  transition: all 0.3s;
}

.inner-wrapper {
  position: relative;
  height: 100%;
}

.text-wrapper {
  position: absolute;
  background-color: rgb(39 39 42 / 1);
  width: 100%;
  bottom: 0;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  box-sizing: border-box;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h2 {
  color: rgb(165 243 252 / 1);
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 0;
}

p {
  color: rgb(34 211 238 / 1);
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  margin: 0;
}

.thumb {
  object-fit: cover;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
}
</style>`;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    // clone template content nodes to the shadow DOM
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('movie-card', MovieCard);
