/* 处理 new */
import API from './API.js';

const GITHUB = new API(
  'https://api.github.com',
  'fengshangwuqi',
  'Front-End-News'
);

class News {
  constructor(repository, url) {
    this.repository = repository;
    this.url = url;
  }

  static getNews() {
    return JSON.parse(localStorage.getItem('FEDN-content'));
  }

  static saveNews(news) {
    localStorage.setItem('FEDN-content', JSON.stringify(news));
  }

  static getPaths() {
    return JSON.parse(localStorage.getItem('FEDN-path'));
  }

  static savePaths(paths) {
    localStorage.setItem('FEDN-path', JSON.stringify(paths));
  }

  static async initPopup(currDate) {
    const years = await GITHUB.getContent('history');
    const lastYear = years.pop();
    const months = await GITHUB.getContent(`history/${lastYear}`);
    const lastMonth = months.pop();
    const days = await GITHUB.getContent(`history/${lastYear}/${lastMonth}`);
    const lastDay = days[days.length - 1];
    let firstThreePaths = [];

    if (new Date(lastDay).getTime() > new Date(currDate).getTime()) {
      firstThreePaths = days.length > 3 ? days.slice(-3) : days;
    } else {
      const currIndex = days.indexOf(currDate.slice(-2));
      firstThreePaths =
        currIndex + 1 > 3
          ? days.slice(currIndex - 2, currIndex + 1)
          : days.slice(0, currIndex + 1);
    }

    const newPaths = firstThreePaths.map(
      day => `${lastYear}/${lastMonth}/${day}`
    );
    News.savePaths(newPaths);

    return newPaths;
  }

  async getCurrNew(path) {
    const news = News.getNews() || [];
    let record = news.find(n => n.path === path);
    let curr = record && record.text;

    if (!curr) {
      try {
        const text = await fetch(this.url, {
          method: 'GET',
        }).then(res => res.text());

        curr = await GITHUB.getMarkdown(text);
        news.push({ path, text: curr });
        News.saveNews(news.length > 3 ? news.slice(1) : news);
      } catch (err) {
        console.error(err);
      }
    }

    return { repository: this.repository, path, text: curr };
  }
}

export default News;
