export class Overlay {
  static bind () {
    let instances = document.querySelectorAll('.overlay');
    window.overlays = {}
    
    Array.from(instances).forEach(instance => {
      window.overlays[instance.id] = new Overlay(instance,  instance.id);
    });

    let links = document.querySelectorAll('a[href^="#overlay-"]');
    links.forEach(link => link.addEventListener('click', Overlay.open));
  }

  static open (e) {
    e.preventDefault();
    let id = e.currentTarget.getAttribute('href').replace('#', '');
    let param = e.currentTarget.dataset.param || false;
    window.overlays[id].open(param);
  }

  constructor (dom, id) {
    this.dom = dom;
    this.id = id;
    this.btnClose = this.dom.querySelector('.overlay__title__close');
    this.btnClose.addEventListener('click', this.close);
  }

  open = (param) => {
    this.dom.classList.add('overlay--open');

    if (param && this.id === 'overlay-contact') {
      let dropdown = this.dom.querySelector('#topic');
      dropdown.value = param;
    }

    this.isOpen = true;
  }

  close = () => {
    this.dom.classList.remove('overlay--open');
    this.isOpen = false;
  }
}
