import Header from './components/Header/index.js';
import Item from './components/Item/index.js';

export const init = () => {
  const div = document.createElement('div');
  div.id = 'news-card';

  div.innerHTML = `<div id="news-header"></div>
<div id="news-container"></div>
`;

  const root = document.body;
  root.insertBefore(div, root.firstChild);
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
    ({ url, text }) => {
      const header = new Header(url, title, titles);

      const pagination = {
        current: titles.indexOf(title) + 1,
        total: titles.length,
      };
      const item = new Item(text, pagination, title);

      header.render();
      header.addListener();
      item.render();
    }
  );
};
