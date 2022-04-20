export class CartOption {
  static bind () {
    const elements = document.querySelectorAll('.cart-option');
    Array.from(elements).forEach(element => new CartOption(element));
  }

  constructor (element) {
    this.element = element;
    this.checkbox = this.element.querySelector('.cart-option__checkbox');
    this.open = false;

    this.checkbox.addEventListener('click', this.toggle);

    if (this.element.id === 'gift-wrap') {
      this.giftWrapRow = document.querySelector('tr[data-type="gift-wrap"]');
      if (this.giftWrapRow) {
        this.open = true;
        this.element.classList.add('cart-option--open');
      }
    }
  }

  toggle = () => {
    this.element.classList[this.open ? 'remove' : 'add']('cart-option--open');
    this.open = !this.open;

    if (this.element.id === 'gift-wrap') this.changeGiftWrap();
  }

  changeGiftWrap = () => {
    if (this.open) {
      // Add the line item to the basket
      window.location.href = '/cart/add?id=39583961383120';
    } else {
      let index = this.giftWrapRow.dataset.row;
      let url = `/cart/change?line=${index}&quantity=0`;
      window.location.href = url;
    }
  }
}