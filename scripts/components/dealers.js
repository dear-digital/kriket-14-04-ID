import haversineDistance from "haversine-distance";

export class DealerCountry {
  static bind () {
    const elements = document.querySelectorAll('.dealers__grid__title');
    Array.from(elements).forEach(element => new DealerCountry(element));

    DealerProvince.bind();
    DealerSearch.bind();
  }

  constructor (element) {
    this.element = element;
    this.open = false;

    this.country = this.element.dataset.country;
    this.dealers = Array.from(document.querySelectorAll(`[data-country="${ this.country }"]`));

    this.element.addEventListener('click', this.toggle);
  }

  toggle = () => {
    this.element.classList[this.open ? 'remove' : 'add']('dealers__grid__title--open');
    this.open = !this.open;

    this.dealers.forEach(dealer => {
      dealer.classList[this.open ? 'add' : 'remove']('dealer--open');
    });
  } 
}

class DealerProvince {
  static bind () {
    const elements = document.querySelectorAll('.dealers__provinces a');
    window.provinceSelectors = Array.from(elements).map(element => new DealerProvince(element));
  }

  constructor (element) {
    this.element = element;
    this.province = element.dataset.province;

    this.dealers = Array.from(document.querySelectorAll(`[data-province="${ this.province }"]`));

    this.element.addEventListener('click', this.show);
  }

  show = (e) => {
    e && e.preventDefault();
    window.provinceSelectors.forEach(province => province.hide());

    this.element.classList.add('selected');
    this.dealers.forEach(dealer => {
      dealer.classList.add('dealer--open');
    });
  }

  hide = () => {
    this.element.classList.remove('selected');
    this.dealers.forEach(dealer => {
      dealer.classList.remove('dealer--open');
    })
  }
}

class DealerSearch {
  static bind () {
    const elements = document.querySelectorAll('.dealers__search');
    Array.from(elements).map(element => new DealerSearch(element));
  }

  constructor (dom) {
    this.dom = dom;
    this.button = this.dom.querySelector('.dealers__search__button a');
    this.button.addEventListener('click', this.search);
    this.container = this.dom.querySelector('.dealers__search__result');

    this.allLocations = document.querySelectorAll('article.dealer');
    this.allLocations = Array.from(this.allLocations);
  }

  search = (e) => {
    e.preventDefault();
    this.container.innerHTML = 'Searching...'
    navigator.geolocation.getCurrentPosition(this.gotLocation);
  }

  gotLocation = (position) => {
    this.coords = position.coords;

    this.allLocations.forEach(location => {
      location.lat = parseFloat(location.dataset.lat);
      location.lon = parseFloat(location.dataset.lon);
      location.distance = haversineDistance(location, this.coords);
    });

    this.container.innerHTML = '';

    this.allLocations
    .filter(location => location.distance && !isNaN(location.distance))
    .sort((a, b) => a.distance - b.distance)
    .forEach(location => {
      location.classList.add('dealer--open');
      this.container.appendChild(location);
    });
  }


}