export class Cookies {
  static bind () {
    const elements = document.querySelectorAll('.cookies');
    Array.from(elements).forEach(element => new Cookies(element));
  }

  constructor (dom) {
    this.cookies = dom;

    const boxes = this.cookies.querySelectorAll('.cookies__list__checkbox');
    this.boxes = Array.from(boxes).map(box => new CookieCheckbox(box));

    const features = [{ name: 'consent-tracking-api', version: '0.1' }];

    window.Shopify.loadFeatures(features, this.init);

    this.cookies.querySelector('.cookies__accept-all').addEventListener('click', this.selectAll);
    this.cookies.querySelector('.cookies__accept-minimal').addEventListener('click', this.selectMinimal);
  }

  init = () => {
    let showBanner = window.Shopify.customerPrivacy.shouldShowGDPRBanner();
    console.log('Should show gdpr banner?', showBanner);
    if (showBanner) this.cookies.classList.add('cookies--visible');
  }

  selectAll = () => {
    this.boxes.forEach(box => box.check());
    setTimeout(this.selectMinimal, 600);
  }

  selectMinimal = () => {
    window.Shopify.customerPrivacy.setTrackingConsent(true, this.hideBanner);
  }

  hideBanner = () => {
    this.cookies.classList.remove('cookies--visible');
  }
}

class CookieCheckbox {
  constructor (dom) {
    this.box = dom;
    this.box.addEventListener('click', this.toggle);
  }

  get isChecked () {
    this.box.classList.contains('cookies__list__checkbox--checked');
  }

  toggle = () => {
    this.box.classList.toggle('cookies__list__checkbox--checked');
  }

  check = () => {
    this.box.classList.add('cookies__list__checkbox--checked');
  }
}