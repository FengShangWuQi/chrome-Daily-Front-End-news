class Item {
  constructor(text, pagination, title) {
    this.text = text;
    this.pagination = pagination;
    this.title = title;
  }

  render() {
    const item = document.getElementById('news-container');
    const { current, total } = this.pagination;

    item.innerHTML = `<div class="news-item">${this.text}</div>
<div class="news-pagination">${current} / ${total}</div>
<div class="news-publish-date">发布：<div id="news-title">${
      this.title
    }</div></div>`;
  }
}

export default Item;
