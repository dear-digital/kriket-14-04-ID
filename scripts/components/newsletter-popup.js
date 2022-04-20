export class NewsletterPopup {
  static bind () {
    const elements = document.querySelectorAll('.newsletter');
    Array.from(elements).forEach(element => new NewsletterPopup(element));
  }

  constructor (dom) {
    this.newsletter = dom;
  
    const features = [{ name: 'consent-tracking-api', version: '0.1' }];
    window.Shopify.loadFeatures(features, this.init);

    this.close = this.newsletter.querySelector('.newsletter__close');

    this.close.addEventListener('click', () => {
      dom.classList.remove('newsletter--visible');
      sessionStorage.setItem('no-newsletter', 'yes');
    });
  }

  init = () => {
    var value = sessionStorage.getItem('no-newsletter');
    if (value !== 'yes') setTimeout(this.checkIfShouldShow, 30 * 1000);
  }

  checkIfShouldShow = () => {
    let gdprNotAccepted = window.Shopify.customerPrivacy.shouldShowGDPRBanner();
    if (!gdprNotAccepted) this.newsletter.classList.add('newsletter--visible');
  }
}