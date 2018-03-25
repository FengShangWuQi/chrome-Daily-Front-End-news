/* github rest api */
import config from '../config/index.js';

const { githubAPIPrefix, owner, repo } = config.url;

const GitHubAPI = new class {
  constructor(prefix, owner, repo) {
    this.prefix = prefix;
    this.owner = owner;
    this.repo = repo;
  }

  /* render an arbitrary markdown document */
  async getMarkdown(text) {
    const res = await fetch(`${this.prefix}/markdown`, {
      method: 'POST',
      body: JSON.stringify({
        text,
      }),
    });
    const md = await res.text();

    return md;
  }

  /* get contents */
  async getContents(path) {
    const res = await fetch(
      `${this.prefix}/repos/${this.owner}/${this.repo}/contents/${path}`,
      {
        method: 'GET',
      }
    );
    const contents = await res.json();

    return contents;
  }
}(githubAPIPrefix, owner, repo);

export default GitHubAPI;
