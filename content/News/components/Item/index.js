import { COLORS } from '../../../../constant.js';

class Item {
  constructor(text, pagination, title) {
    this.text = text;
    this.pagination = pagination;
    this.title = title;
  }

  render() {
    const item = document.getElementById('news-container');
    const { current, total } = this.pagination;
    const index = new Date().getDate() - 1;
    const color = COLORS[index];

    item.innerHTML = `
<div class="news-item">${this.text}</div>
	<footer class="news-footer">
		<div class="news-pagination">${current} / ${total}</div>
		<div class="news-publish-date">发布：<div id="news-title">${this.title}</div>
	</footer>
</div>`;

    document.querySelector('blockquote').style.background = color;
  }
}

export default Item;
