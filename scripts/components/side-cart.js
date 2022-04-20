import axios from 'axios';

const formatter = new Intl.NumberFormat('nl-BE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
})

export class Sidecart {
  static bind () {
    var elements = document.querySelectorAll('#overlay-cart');
    var instances = Array.from(elements).map(element => new Sidecart(element));

    let mainButton = document.querySelector('.nav__right a:last-child');
    mainButton.addEventListener('click', (e) => {
      if (window.innerWidth > 750) {
        e.preventDefault();
        window.overlays['overlay-cart'].open();
      }
    });    
  }

  constructor (dom) {
    this.dom = dom;
    this.container = dom.querySelector('.overlay__content__items');
    this.removeText = this.dom.dataset.remove;
    window.sidecart = this;
    this.refresh();
  }

  refresh = () => {
    const cartUrl = this.dom.dataset.url + '.js';

    axios.get(cartUrl).then(response => {
      this.data = response.data;
      console.log(this.data);
      this.render();
    });
  }

  add = (variant, quantity = 1) => {
    axios.post('/cart/add.js', { id: variant,  quantity }).then(() => {
      this.refresh();
    });
  }

  remove = (line) => {
    axios.post('/cart/change.js', { line,  quantity: 0 }).then(this.refresh);
  }

  render = () => {
    // Set all cart count labels
    var elements = document.querySelectorAll('.nav__cart-counter');
    Array.from(elements).forEach(element => element.innerHTML = this.data.item_count);

    // Render the items
    this.container.innerHTML = '';

    this.data.items.forEach((item, index) => {
      const domItem = document.createElement('div');
      domItem.innerHTML = this.renderItem(item);

      domItem.querySelector('a[href="remove"]').addEventListener('click', (e) => {
        e.preventDefault();
        this.remove(index + 1);
      })

      this.container.appendChild(domItem);
    });
  }

  renderItem = (item) => `
    <div class="product-cart-tile" data-type="${ item.product_type }">
      <div class="product-cart-tile__container">
        <div class="product-cart-tile__elements">
          <div class="product-cart-tile__image">
            <img src="${item.image}" alt="${ item.product_title }" />
          </div>
          <div class="product-cart-tile__content">
            <p class="product-cart-tile__subtitle">
              ${ item.quantity > 1 ? `${ item.quantity } X` : '' } ${ item.product_title }
            </p>
            <div class="product-cart-tile__details">
              ${ item.variant_title }
            </div>
            <div class="product-cart-tile__button">
              <a href="remove">${ this.removeText }</a>
            </div>
          </div>
          <div class="product-cart-tile__price">
            ${ formatter.format(item.final_line_price / 100) }
          </div>
        </div>
      </div>
    </div>
  `;
}
