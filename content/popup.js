import NewsCard from './newsCard.js';

chrome.runtime.sendMessage(
  {
    action: 'initPopup',
  },
  res => {
    NewsCard.init(res);
  }
);
