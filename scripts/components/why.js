export class Why {
  static bind () {
    const elements = document.querySelectorAll('.block-about-title');
    Array.from(elements).forEach(element => new Why(element));
  }

  constructor (element) {
    this.element = element;
    this.open = false;
    this.children = [];
  
    var next = this.element.nextElementSibling;

    while (next && next.nodeName !== 'H2') {
      this.children.push(next);
      var next = next.nextSibling;

      if (next && next.getAttribute && next.getAttribute('name') === 'sustainability-superstar') {
        next = false;
      }
    }

    this.render();

    this.element.addEventListener('click', this.toggle);
  }

  toggle = () => {
    this.open = !this.open;
    this.render();
  }

  render = () => {
    this.element.classList[this.open ? 'add' : 'remove']('block-about-title--open');

    this.children.forEach(child => {
      if (child.nodeName === 'A') return;
      if (child.style) {
        child.style.display = this.open ? 'block' : 'none';
        child.classList[this.open ? 'add' : 'remove']('animate');

        if (child.classList && child.classList.contains('block-about-pie-charts') && this.open) {
          if (window.innerWidth > 768) {
            child.style.display = 'flex';
          }
        }
      }
    });
  }
}