export class FAQ {
  static bind () {
    const elements = document.querySelectorAll('.faq__item');
    Array.from(elements).forEach(element => new FAQ(element));
  }

  constructor (element) {
    this.element = element;
    this.open = false;

    this.element.addEventListener('click', this.toggle);
  }

  toggle = () => {
    this.element.classList[this.open ? 'remove' : 'add']('faq__item--open');
    this.open = !this.open;
  } 
}