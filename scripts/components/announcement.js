export class Announcement {
  static bind () {
    var elements = document.querySelectorAll('.announcement');
    var instances = Array.from(elements).map(element => new Announcement(element));
  }

  constructor (element) {
    this.element = element;
    this.elementClose = element.querySelector('.announcement__close');
    this.elementClose.addEventListener('click', this.close);

    var isClosed = window.sessionStorage.getItem('announcement-closed') || false;
    if (!isClosed) {
      this.element.classList.remove('announcement--hidden');
      document.body.classList.add('has-announcement');
    }
  }

  close = (e) => {
    window.sessionStorage.setItem('announcement-closed', true);
    this.element.classList.add('announcement--hidden');
    document.body.classList.remove('has-announcement');
  }
}