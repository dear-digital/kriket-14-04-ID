import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';


export class MailchimpForm {
  static bind () {
    const elements = document.querySelectorAll('.mainchimp-form');
    Array.from(elements).forEach(element => new MailchimpForm(element));
  }

  constructor (dom) {
    this.form = dom;
    this.form.classList.add('mainchimp-form--bound');
    this.form.addEventListener('submit', this.submit);
  }

  submit = (e) => {
    e.preventDefault();

    var url = this.form.getAttribute('action');
    const email = this.form.querySelector('input[type="email"]').value;
    url += '&EMAIL=' + encodeURIComponent(email);

    axios.get(url, {  adapter: jsonpAdapter, callbackParamName: 'c' }).then(this.thanks).catch(this.thanks);
  }

  thanks = (response) => {
    this.form.classList.add('mainchimp-form--thanks');
    this.form.innerHTML = response.data.msg;
  }
}