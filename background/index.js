import * as news from './News/index.js';

const handleMessage = async (message, sender, sendResponse) => {
  try {
    switch (message.type) {
      case 'news':
        await news.handleMessage(message, sender, sendResponse);
        break;
      default:
        sendResponse(false);
    }
  } catch (err) {
    console.error(err);
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender, sendResponse);
  return true;
});
