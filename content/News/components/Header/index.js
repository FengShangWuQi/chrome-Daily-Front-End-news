import { getCurrContent } from '../../index.js';

class Header {
  constructor(url, title, titles) {
    this.url = url;
    this.title = title;
    this.titles = titles;
  }

  addListener() {
    const { title, titles } = this;
    const currIndex = titles.indexOf(title);
    const length = titles.length;

    const readMore = document.getElementById('news-read-more');

    if (title !== titles[titles.length - 1]) {
      readMore.style.display = 'none';
    }

    const leftArrow = document.getElementById('news-left-arrow');
    const prevTitle = currIndex === 0 ? null : titles[currIndex - 1];

    const rightArrow = document.getElementById('news-right-arrow');
    const nextTitle = currIndex === length - 1 ? null : titles[currIndex + 1];

    Header.handleArrow(leftArrow, prevTitle, titles);
    Header.handleArrow(rightArrow, nextTitle, titles);
  }

  static handleArrow(dom, title, titles) {
    if (title) {
      dom.addEventListener('click', () => {
        getCurrContent(titles, title);
      });
    } else {
      dom.style.display = 'none';
    }
  }

  render() {
    const header = document.getElementById('news-header');

    header.innerHTML = `<div id="news-left-arrow" class="news-header-arrow"><<<</div>
<div id="news-right-arrow" class="news-header-arrow">>>></div>
<a href="${
      this.url
    }" rel="noopener noreferrer" id="news-read-more" style="color: #00bcd4">查看更多</a>`;
  }
}

export default Header;
