import Loading from '../Loading/index.js';
import { getCurrContent } from '../../index.js';
import { COLORS } from '../../../../constant.js';

class Header {
  constructor(url, title, titles) {
    this.url = url;
    this.title = title;
    this.titles = titles;
  }

  addListener() {
    const { title, titles } = this;
    const currIndex = titles.indexOf(title);
    const { length } = titles;

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
        Loading.renderHeader();
        Loading.renderItem();
        setTimeout(() => getCurrContent(titles, title), 750);
      });
    } else {
      dom.style.display = 'none';
    }
  }

  render() {
    const header = document.getElementById('news-header');
    const index = new Date().getDate() - 1;
    const color = COLORS[index];

    header.innerHTML = `<div id="news-left-arrow" class="news-header-arrow"><<<</div>
<div id="news-right-arrow" class="news-header-arrow">>>></div>
<a href="${
      this.url
    }" rel="noopener noreferrer" id="news-read-more" style="color: ${color}">查看更多</a>`;
  }
}

export default Header;
