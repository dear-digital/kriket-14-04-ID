

import '../styles/theme.scss'

import { Announcement } from './components/announcement';
import { ArrowLink } from './components/arrow-link';
import { CartOption } from './components/cart-option';
import { Cookies } from './components/cookies';
import { DealerCountry } from './components/dealers';
import { FAQ } from './components/faq';
import { MailchimpForm } from './components/mailchimp-form';
import { NewsletterPopup } from './components/newsletter-popup';
import { Overlay } from './components/overlay';
import { ProductDetail } from './components/product-detail';
import { Sidecart } from './components/side-cart';
import { Why } from './components/why';

window.addEventListener('DOMContentLoaded', (event) => {
  const toggle = (e) => {
    e.preventDefault();
    console.log('Click!');
    document.body.classList.toggle('nav--open');
  }
  
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', toggle);

  Announcement.bind();
  ProductDetail.bind();
  FAQ.bind();
  Why.bind();
  CartOption.bind();
  MailchimpForm.bind();
  Cookies.bind();
  NewsletterPopup.bind();
  DealerCountry.bind();
  ArrowLink.bind();
  Overlay.bind();
  Sidecart.bind();

  window.Marquee3k.init();

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) document.body.classList.add('scrolled');
    if (window.scrollY < window.innerHeight) document.body.classList.remove('scrolled');
  });  

  if (window.Shopify?.designMode) {
    document.body.classList.add('shopify-editor-mode');
  }

  // Make the svgs responsive

  // new ExternalSvgPolyfill();
  
  var svgs = document.querySelectorAll(".full-width-svg svg");

  Array.from(svgs).forEach(svg => {
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
    svg.setAttribute("viewBox", [0, 0, svg.getAttribute("width"), svg.getAttribute("height")].join(" "));
  
    svg.removeAttribute("width");
    svg.removeAttribute("height");

    var baseUrl = window.location.href.replace(window.location.hash, "");

		let links = svg.querySelectorAll("use[*|href]");
    Array.from(links).filter(function(element) {
      return (element.getAttribute("xlink:href").indexOf("#") === 0);
    }).forEach(function(element) {
      element.setAttribute("xlink:href", baseUrl + element.getAttribute("xlink:href"));
    });
  });

  // Activate Glider
  window.Gilder && new window.Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    draggable: true,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });
  
  console.log('Did glider');
});




