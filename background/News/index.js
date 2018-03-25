import News from './News.js';
import formatDate from '../../utils/formatDate.js';

export const handleMessage = async (message, sender, sendResponse) => {
  try {
    switch (message.action) {
      case 'getTitles': {
        const titles = News.getTitles();
        const title = formatDate(new Date());

        if (titles.includes(title)) {
          sendResponse(titles);
        } else {
          const newTitles = await News.getNewTitles();

          sendResponse(newTitles);
        }
        break;
      }
      case 'getCurrContent': {
        const newsOne = new News(message.payload.title);

        sendResponse(await newsOne.getCurrContent());
        break;
      }
      default:
        sendResponse(false);
    }
  } catch (err) {
    console.error(err);
  }
};
