/* github rest api */
import config from '../../config/index.js';
import { getToken } from '../../utils/token.js';

const { githubAPIPrefix, owner, repo } = config.url;

const GitHubAPI = new class {
  constructor(prefix, owner, repo) {
    this.prefix = prefix;
    this.owner = owner;
    this.repo = repo;
  }

  /* render an arbitrary markdown document */
  async getMarkdown(text) {
    const params = {
      method: 'POST',
      body: JSON.stringify({
        text,
      }),
    };
    const token = getToken();
    const res = await fetch(
      `${this.prefix}/markdown`,
      token
        ? Object.assign(
            {
              headers: {
                Authorization: `token ${token}`,
              },
            },
            params
          )
        : params
    );
    const md = await res.text();

    return md;
  }

  /* get contents */
  async getContents(path) {
    const params = {
      method: 'GET',
    };
    const token = getToken();
    const res = await fetch(
      `${this.prefix}/repos/${this.owner}/${this.repo}/contents/${path}`,
      token
        ? Object.assign(
            {
              headers: {
                Authorization: `token ${token}`,
              },
            },
            params
          )
        : params
    );
    const contents = await res.json();

    return contents;
  }
}(githubAPIPrefix, owner, repo);

export default GitHubAPI;
