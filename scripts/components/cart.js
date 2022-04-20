import axios from 'axios';

const formatter = new Intl.NumberFormat('nl-BE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
})

export class Sidecart {
  static bind () {
    var elements = document.querySelectorAll('.sidecart');
    var instances = Array.from(elements).map(element => new Sidecart(element));
  }

  constructor (element) {
    this.element = element;
    this.domContent = element.querySelector('.sidecart__items');
    window.sidecart = this;

    this.element.querySelector('.button--hollow').addEventListener('click', this.close);
    this.element.querySelector('.sidecart__header__close').addEventListener('click', this.close);

    this.refresh();
  }

  refresh = () => {
    axios.get('/cart.js').then(response => {
      this.data = response.data;
      this.render();
    });
  }

  add = (variant) => {
    this.open();
    axios.post('/cart/add.js', { id: variant,  quantity: 1 }).then(this.refresh);
  }

  remove = (line) => {
    axios.post('/cart/change.js', { line,  quantity: 0 }).then(this.refresh);
  }

  open = (e) => {
    e && e.preventDefault()
    this.element.classList.add('sidecart--open');
  }

  close = (e) => {
    e && e.preventDefault()
    this.element.classList.remove('sidecart--open');
  }

  render = () => {
    // Set all cart count labels
    var elements = document.querySelectorAll('.cart-counter');
    Array.from(elements).forEach(element => element.innerHTML = this.data.item_count);

    document.getElementById('cart-subtotal').innerHTML = formatter.format(this.data.items_subtotal_price / 100);
    document.getElementById('cart-total').innerHTML = formatter.format(this.data.total_price / 100);

    // Render the items
    this.domContent.innerHTML = '';

    if (this.data.item_count === 0) this.element.classList.add('sidecart--empty');
    else this.element.classList.remove('sidecart--empty');

    this.data.items.forEach((item, index) => {
      const domItem = document.createElement('div');
      domItem.setAttribute('class', 'cart__item cart__item--compact');
      domItem.innerHTML = `
        <div class="cart__item__image">
          <img src="${item.image}" alt="${ item.product_title }" />
        </div>
        <div class="cart__item__info">
          <div>
            <span>${ item.product_title }</span>
          </div>
          ${ item.options_with_values.map(option => `<div><span>${ option.name }</span>${ option.value }</div>`).join('') }
          <div>
            <a href="cart__item__info__price" data-variant>remove</a>
          </div>
          <div class="cart__item__info__price">${ formatter.format(item.price / 100) }</div>
        </div>
      `;

      domItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        this.remove(index + 1);
      })

      this.domContent.appendChild(domItem);
    });
  }
}