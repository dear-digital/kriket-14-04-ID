export class ProductDetail {
  static bind () {
    const elements = document.querySelectorAll('.template--product ');
    const instances = Array.from(elements).map(element => new ProductDetail(element));
  }

  constructor (element) {
    this.page = element;
    this.buildTabs();
    this.linkButtons();
    this.initGallery();
  }

  buildTabs = () => {
    this.tabs =  this.page.querySelector('.product-tabs');
    this.titles = this.tabs.querySelector('.product-tabs__title');
    this.contents = this.tabs.querySelector('.product-tabs__content');

    const titles = document.querySelectorAll('.page-header__intro h3');

    Array.from(titles).forEach((title, index) => {
      const link = document.createElement('a');
      link.innerText = title.innerText;
      link.href = '#';
      link.addEventListener('click', (e) => this.selectTab(index, e));
      this.titles.appendChild(link);

      const tab = document.createElement('div');
      while (title.nextSibling && title.nextSibling.nodeType !== 'H3') {
        tab.appendChild(title.nextSibling);
      }

      this.contents.appendChild(tab);    
    });
  }

  selectTab = (index, e) => {
    e && e.preventDefault();
    this.tabs.dataset.tab = index;
  }

  linkButtons = () => {
    const buttons = this.page.querySelectorAll('.purchase-buttons button');
    Array.from(buttons).forEach(button => {
      let available = button.dataset.available === 'true';
      button.dataset.hoverText = available ? window.cartLabels.add : window.cartLabels.soldOut;

      button.addEventListener('mouseover', this.buttonIn);
      button.addEventListener('mouseout', this.buttonOut);
      button.addEventListener('click', this.buttonClick);
    });
  }

  buttonIn = (e) => {
    let button = e.currentTarget;
    button.dataset.originalText = button.innerText;
    button.innerText = button.dataset.hoverText;
  }

  buttonOut = (e) => {
    let button = e.currentTarget;
    button.innerText = button.dataset.originalText;
  }

  buttonClick = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    const available = button.dataset.available === 'true';
    const variant = button.dataset.variant;

    if (available) {
      window.sidecart.add(variant);
      window.overlays['overlay-cart'].open();
    }
  }

  initGallery = () => {
    window.addEventListener('load', () => {
      console.log('Init Swiper JS');

      this.swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
    })
  }
}