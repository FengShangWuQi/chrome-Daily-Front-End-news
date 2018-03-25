import formatDate from '../utils/formatDate.js';
import * as News from './News/index.js';

chrome.runtime.sendMessage(
  {
    type: 'news',
    action: 'getTitles',
  },
  titles => {
    News.init(titles);

    if (titles.length > 0) {
      const title = formatDate(new Date());
      const currTitle = titles.includes(title)
        ? title
        : titles[titles.length - 1];

      News.getCurrContent(titles, currTitle);
    } else {
      /* todo */
    }
  }
);
