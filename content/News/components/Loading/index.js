import config from '../../../../config/index.js';
import { COLORS } from '../../../../constant.js';

const { repo } = config.url;

const Loading = new class {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }

  renderHeader() {
    const header = document.getElementById('news-header');
    const index = new Date().getDate() - 1;
    const color = COLORS[index];

    header.innerHTML = `
<blockquote style="background: ${color}"><h1>${this.title}</h1></blockquote>	
 `;
  }

  renderItem() {
    const item = document.getElementById('news-container');

    item.innerHTML = `
<div class="container">
	<div class="loading-logo">
		<div class="white"></div>
		<div class="orange"></div>
		<div class="red"></div>
	</div>
	<h1 class="loading-text">${this.text}<h1>
</div>`;
  }
}(repo, 'Loading ...');

export default Loading;
