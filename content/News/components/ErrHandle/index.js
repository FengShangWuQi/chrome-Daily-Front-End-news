import Loading from '../../components/Loading/index.js';
import { getTitles } from '../../../News/index.js';
import { setToken } from '../../../../utils/token.js';

class ErrHandle {
  constructor(err) {
    this.err = err;
  }

  static addToken() {
    const div = document.createElement('div');
    div.classList.add('token-container');

    div.innerHTML = `
<input type="text" id="token-input" class="token-input">
<button id="submit-btn" class="submit-btn">确认</button>
<div class="token-err-text">输入不合法</div>
<a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" rel="noopener noreferrer" class="err-help">帮助</a>
`;

    const root = document.getElementById('err-container');
    root.append(div);

    const subBtn = document.getElementById('submit-btn');
    const tokenTarget = document.getElementById('token-input');

    subBtn.addEventListener('click', () => {
      const token = tokenTarget.value;

      if (new RegExp('[^a-z0-9]', 'g').test(token)) {
        tokenTarget.parentNode.classList.add('token-checked-err');
      } else {
        setToken(token);
        Loading.renderHeader();
        Loading.renderItem();
        setTimeout(() => getTitles(), 750);
      }
    });

    tokenTarget.addEventListener('keydown', e => {
      if (e.keyCode === 13 && e.target.value) {
        subBtn.click();
      }
    });
  }

  render() {
    const { name, message } = this.err;
    const item = document.getElementById('news-container');
    const defaultMsg =
      'OOPS！你遇到一个异常，作者会很高兴收到你的反馈，email：fengshangwuqi@gmail.com';

    item.innerHTML = `
<div id="err-container" class="container">
	<div class="err-msg">${message || defaultMsg}</div>
</div>
`;

    switch (name) {
      case 'rateLimitErr':
      case 'credentialsErr':
        ErrHandle.addToken();
        break;
      default:
        break;
    }
  }
}

export default ErrHandle;
