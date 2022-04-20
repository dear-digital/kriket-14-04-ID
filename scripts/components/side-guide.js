export class SizeGuide {
  static bind () {
    const elements = document.querySelectorAll('.size-guide');
    Array.from(elements).forEach(element => new SizeGuide(element));
  }

  constructor (element) {
    this.element = element;
    this.open = false;

    var button = document.getElementById('open-size-guide');
    button.addEventListener('click', this.toggle);
    
    this.element.addEventListener('click', this.toggle);
    var close = document.querySelector('.size-guide__close');
    close.addEventListener('click', this.toggle);

    this.wrapper = this.element.querySelector('.size-guide__wrapper');
    this.wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
    })
  }

  toggle = () => {
    this.element.classList[this.open ? 'remove' : 'add']('size-guide--visible');
    this.open = !this.open;
  } 
  
}