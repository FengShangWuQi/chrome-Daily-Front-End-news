/* github rest api */

class API {
  constructor(url, owner, repo) {
    this.url = url;
    this.owner = owner;
    this.repo = repo;
  }

  /* Render an arbitrary Markdown document */
  async getMarkdown(text) {
    const res = await fetch(`${this.url}/markdown`, {
      method: 'POST',
      body: JSON.stringify({
        text,
      }),
    }).then(res => res.text());

    return res;
  }

  /* Get contents */
  async getContent(path) {
    const res = await fetch(
      `${this.url}/repos/${this.owner}/${this.repo}/contents/${path}`,
      {
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(json => json.map(path => path.name));

    return res;
  }
}

export default API;
