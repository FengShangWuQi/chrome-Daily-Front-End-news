import News from './News.js';
import formatDate from '../../utils/formatDate.js';

export const handleMessage = async (message, sender, sendResponse) => {
  try {
    switch (message.action) {
      case 'getTitles': {
        const titles = News.getTitles();
        const title = formatDate(new Date());

        const res = {
          code: 0,
          titles: titles.includes(title) ? titles : await News.getNewTitles(),
        };
        sendResponse(res);
        break;
      }
      case 'getCurrContent': {
        const item = new News(message.payload.title);

        sendResponse({
          code: 0,
          content: await item.getCurrContent(),
        });
        break;
      }
      default:
        console.error('未找到匹配 action');
    }
  } catch (err) {
    console.error(err.message);

    sendResponse({
      code: 1,
      err,
    });
  }
};
