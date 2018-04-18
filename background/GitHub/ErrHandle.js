import { setToken } from '../../utils/token.js';

function GitHubErr(name, message) {
  this.name = name;
  this.message = message;
  this.stack = new Error().stack;
}
GitHubErr.prototype = Object.create(Error.prototype);
GitHubErr.prototype.constructor = GitHubErr;

export const checkRateLimit = param => {
  if (
    param.documentation_url === 'https://developer.github.com/v3/#rate-limiting'
  ) {
    throw new GitHubErr(
      'rateLimitErr',
      'OOPS！已超过 rate limit，好消息是可以通过添加 GitHub personal access token 尝试修复'
    );
  } else if (param.message === 'Bad credentials') {
    setToken('');

    throw new GitHubErr(
      'credentialsErr',
      'OOPS！GitHub personal access token 认证失败，请确认 token 是否有效'
    );
  } else if (param.message === 'Not Found') {
    throw new GitHubErr(
      'dataSourceErr',
      'OOPS！数据源仓库找不着了，可以尝试联系作者确认，email：fengshangwuqi@gmail.com'
    );
  }
};
