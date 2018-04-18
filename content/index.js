import * as News from './News/index.js';

News.init();
setTimeout(() => News.getTitles(), 750);
