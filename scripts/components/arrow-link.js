export class ArrowLink {
  static bind () {
    const elements = document.querySelectorAll('.arrow-link');
    Array.from(elements).forEach(element => new ArrowLink(element));
  }

  constructor (dom) {
    this.dom = dom;
    this.dom.addEventListener('click', this.click);
  }

  click = (e) => {
    this.dom.classList.add('arrow-link--rotate');
  }
}