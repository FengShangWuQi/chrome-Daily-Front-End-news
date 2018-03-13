import { formatDate } from '../utils/date.js';

const NewsCard = {};

NewsCard.init = function(paths) {
  const div = document.createElement('div');
  div.id = 'new-card';
  const root = document.body;
  root.insertBefore(div, root.firstChild);

  if (paths.length !== 0) {
    const currDate = formatDate(new Date());
    const currPath = paths.includes(currDate)
      ? currDate
      : paths[paths.length - 1];
    NewsCard.getCurrNew(currPath);
  } else {
    /* todo */
  }

  this.paths = paths;
};

NewsCard.addListeners = function() {
  const path = document.getElementById('path').innerText;
  const more = document.getElementById('read-more');
  const paths = NewsCard.paths;
  const index = paths.indexOf(path);
  const length = paths.length;

  if (path !== paths[paths.length - 1]) {
    more.style.display = 'none';
  }

  const prevPath = index === 0 ? null : paths[index - 1];
  const nextPath = index === length - 1 ? null : paths[index + 1];
  const left = document.getElementById('left-arrow');
  const right = document.getElementById('right-arrow');

  NewsCard.handleArrow(prevPath, left);
  NewsCard.handleArrow(nextPath, right);
};

NewsCard.handleArrow = function(path, dom) {
  if (path) {
    dom.addEventListener('click', () => {
      NewsCard.getCurrNew(path);
    });
  } else {
    dom.style.display = 'none';
  }
};

NewsCard.getCurrNew = function(path) {
  chrome.runtime.sendMessage(
    {
      action: 'getCurrNew',
      path,
    },
    res => {
      const paths = NewsCard.paths;
      const card = document.getElementById('new-card');

      card.innerHTML = `<div class="publish-date">发布：<div id="path">${
        res.path
      }</div></div>
<div id="left-arrow" class="card-arrow"><<<</div>
<div id="right-arrow" class="card-arrow">>>></div>
<a href="${
        res.repository
      }" rel="noopener noreferrer" id="read-more" style="color: #00bcd4">查看更多</a>
${res.text}
<div class="pagination">${paths.indexOf(path) + 1} / ${paths.length}</div>`;

      NewsCard.addListeners();
    }
  );
};

export default NewsCard;
