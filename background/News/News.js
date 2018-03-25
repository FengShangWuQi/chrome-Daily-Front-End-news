/* handle news */
import GitHubAPI from '../API/github.js';
import config from '../config/index.js';
import formatDate from '../../utils/formatDate.js';

class News {
  constructor(title) {
    this.title = title;
  }

  static getTitles() {
    try {
      return JSON.parse(localStorage.getItem('FEDN-titles')) || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  static setTitles(titles) {
    localStorage.setItem('FEDN-titles', JSON.stringify(titles));
  }

  static getContents() {
    try {
      return JSON.parse(localStorage.getItem('FEDN-contents')) || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  static setContents(contents) {
    localStorage.setItem('FEDN-contents', JSON.stringify(contents));
  }

  static async getNewTitles() {
    const { MAX } = config.params;
    let topNumTitles = [];

    const years = await GitHubAPI.getContents('history');
    const lastYear = years.pop().name;
    const months = await GitHubAPI.getContents(`history/${lastYear}`);
    const lastMonth = months.pop().name;
    const dayDetails = await GitHubAPI.getContents(
      `history/${lastYear}/${lastMonth}`
    );
    const days = dayDetails.map(day => day.name);
    const lastDay = days[days.length - 1];

    if (Date.parse(`${lastYear}/${lastMonth}/${lastDay}`) < Date.now()) {
      topNumTitles = days.length > MAX ? days.slice(-MAX) : days;
    } else {
      const currIndex = days.indexOf(formatDate(new Date()).slice(-2));

      topNumTitles =
        currIndex + 1 >= MAX
          ? days.slice(currIndex - MAX + 1, currIndex)
          : days.slice(0, currIndex);
    }

    const newTitles = topNumTitles.map(
      day => `${lastYear}/${lastMonth}/${day}`
    );
    News.setTitles(newTitles);

    return newTitles;
  }

  async getCurrContent() {
    const { title } = this;
    const contents = News.getContents();
    const currContent = contents.find(curr => curr.title === title);
    let content = currContent && currContent.text;
    const {
      url: { githubPrefix, githubRawPrefix, owner, repo },
      params: { MAX, branch, folder, file },
    } = config;

    if (!content) {
      try {
        const res = await fetch(
          `${githubRawPrefix}/${owner}/${repo}/${branch}/${folder}/${title}/${file}`,
          {
            method: 'GET',
          }
        );
        const text = await res.text();

        content = await GitHubAPI.getMarkdown(text);

        contents.push({ title, text: content });
        const newConstents =
          contents.length > MAX ? contents.slice(1) : contents;

        News.setContents(newConstents);
      } catch (err) {
        console.error(err);
        return {};
      }
    }

    return {
      url: `${githubPrefix}/${owner}/${repo}`,
      text: content,
    };
  }
}

export default News;
