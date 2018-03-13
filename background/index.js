import News from './News.js';
import { formatDate } from '../utils/date.js';

async function handleMessage(message, sender, sendResponse) {
  const paths = News.getPaths() || [];
  const currDate = formatDate(new Date());

  try {
    switch (message.action) {
      case 'initPopup':
        if (paths.includes(currDate)) {
          sendResponse(paths);
        } else {
          const newPaths = await News.initPopup(currDate);
          sendResponse(newPaths);
        }
        break;
      case 'getCurrNew':
        const currPath = message.path;
        const NEWS = new News(
          'https://github.com/FengShangWuQi/Daily-Front-End-News',
          `https://raw.githubusercontent.com/FengShangWuQi/Front-End-News/master/history/${currPath}/README.md`
        );

        sendResponse(await NEWS.getCurrNew(currPath));
        break;
      default:
        sendResponse(false);
    }
  } catch (err) {
    console.error(err);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender, sendResponse);
  return true;
});
