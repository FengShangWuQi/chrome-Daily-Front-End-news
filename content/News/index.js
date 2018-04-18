import Loading from './components/Loading/index.js';
import Header from './components/Header/index.js';
import Item from './components/Item/index.js';
import ErrHandle from './components/ErrHandle/index.js';
import formatDate from '../../utils/formatDate.js';

export const init = () => {
  const div = document.createElement('div');
  div.id = 'news-card';

  div.innerHTML = `
<div id="news-header"></div>
<div id="news-container"></div>
`;

  const root = document.body;
  root.insertBefore(div, root.firstChild);

  Loading.renderHeader();
  Loading.renderItem();
};

export const getCurrContent = (titles, title) => {
  chrome.runtime.sendMessage(
    {
      type: 'news',
      action: 'getCurrContent',
      payload: {
        title,
      },
    },
    res => {
      if (res.code === 0) {
        const { url, text } = res.content;

        const header = new Header(url, title, titles);
        const pagination = {
          current: titles.indexOf(title) + 1,
          total: titles.length,
        };
        const item = new Item(text, pagination, title);

        header.render();
        header.addListener();
        item.render();
      } else {
        const errHandle = new ErrHandle(res.err);
        errHandle.render();
      }
    }
  );
};

export const getTitles = () => {
  chrome.runtime.sendMessage(
    {
      type: 'news',
      action: 'getTitles',
    },
    res => {
      if (res.code === 0) {
        const { titles } = res;

        if (titles.length > 0) {
          const title = formatDate(new Date());
          const currTitle = titles.includes(title)
            ? title
            : titles[titles.length - 1];

          getCurrContent(titles, currTitle);
        } else {
          const errHandle = new ErrHandle({
            message: 'OOPS！数据源仓库是空的',
          });
          errHandle.render();
        }
      } else {
        const errHandle = new ErrHandle(res.err);
        errHandle.render();
      }
    }
  );
};
