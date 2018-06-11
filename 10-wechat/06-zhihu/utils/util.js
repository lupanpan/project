var HtmlParser = require('htmlParseUtil.js');

/**
 * 拓展String，去掉首位空白字符
 */
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 拓展String，判断字符是否为空
 */
String.prototype.isEmpty = function () {
  return this.trim() == '';
}

/**
 * 处理日期格式
 */
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

/**
 * 处理1位数字前边加0
 */
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/**
 * 获取当前日期对象
 * @returns {object}
 */
function getCurrentData() {
  var date = new Date();
  return {
    date: date,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay()
  };
}

/**
 * 快捷方法 获取HtmlParser对象
 * @param {string} html html文本
 * @return {object} HtmlParser
 */
function $(html) {
  return new HtmlParser(html);
}

/**
 * 解析story对象的body部分
 * @param {string} html body的html文本
 * @param {boolean} isDecode 是否需要 unicode 解析
 * @return {object} 解析后的对象
 */
function parseStory(html, isDecode) {
  var questionArr = $(html).tag('div').attr('class', 'question').match();
  var stories = [];
  var $story;

  if (questionArr) {
    for (var i = 0, len = questionArr.length; i < len; i++) {
      $story = $(questionArr[i]);
      var mavatar = getArrayContent(getArrayContent($story.tag('div').attr('class', 'meta').match()).jhe_ma('img', 'src'));
      mavatar = fixImgPrefix(mavatar);
      stories.push({
        index: i,
        title: getArrayContent($story.tag('h2').attr('class', 'question-title').match()),
        avatar: mavatar,
        author: getArrayContent($story.tag('span').attr('class', 'author').match()),
        bio: getArrayContent($story.tag('span').attr('class', 'bio').match()),
        content: parseStoryContent($story, isDecode),
        more: getArrayContent(getArrayContent($(html).tag('div').attr('class', 'view-more').match()).jhe_ma('a', 'href'))
      });
    }
  }
  return stories;
}

/**
 * 解析文章内容
 * @param {string} $story htmlparser对象
 * @param {boolean} isDecode 是否需要unicode解析
 * @return {object} 文章内容对象
 */
function parseStoryContent($story, isDecode) {
  var content = [];
  var ps = $story.tag('p').match();
  var p, strong, img, blockquote, em;
  if (ps) {
    for (var i = 0, len = ps.length; i < len; i++) {
      p = transferSign(ps[i]); //获取<p>的内容，并将特殊符号转义
      if (!p || p.isEmpty())
        continue;

      img = getArrayContent((p.jhe_ma('img', 'src')));
      strong = getArrayContent(p.jhe_om('strong'));
      em = getArrayContent(p.jhe_om('em'));
      blockquote = getArrayContent(p.jhe_om('blockquote'));
      
      if (!img.isEmpty()) { // 获取图片
        img = fixImgPrefix(img);
        content.push({ index: i, type: 'img', value: img });
      }
      else if (isOnly(p, strong)) { // 获取加粗段落<p><strong>...</strong></p>
        strong = decodeHtml(strong, isDecode);
        if (!strong.isEmpty())
          content.push({ index: i, type: 'pstrong', value: strong });
      }
      else if (isOnly(p, em)) { // 获取强调段落<p><em>...</em></p>
        em = decodeHtml(em, isDecode);
        if (!em.isEmpty())
          content.push({ index: i, type: 'pem', value: em });
      }
    }
  }
}

/**
 * 取出多余或者难以解析的html并且替换转义符号
 */

/**
 * 获取数组中的内容（一般为第一个元素）
 * @param {array} arr 内容数组
 * @return {string} 内容
 */
function getArrayContent(arr) {
  if (!arr || arr.length == 0) return '';
  return arr[0];
}

function isOnly(src, target) {
  return src.trim() == target;
}

/**
 * 将转义字符转为实体
 * @param data
 * @return {*}
 */
function transferSign(data) {
  data = data.replace(/&ndash;/g, "-");
  data = data.replace(/&mdash;/g, "—");
  data = data.replace(/&hellip;/g, "…");
  data = data.replace(/&bull;/g, "•");
  data = data.replace(/&rsquo;/g, "’");
  data = data.replace(/&ndash;/g, "–");
  return data;
}

/**
 * 修正图片域名，部分图片可能不能直接加载
 * @param imgUrl 图片地址
 * @returns 修正后的图片地址
 */
function fixImgPrefix(imgUrl) {
  // 2018年3月31日 取消图片资源域名替换，现在可以直接正常访问图片
  // if (!imgUrl)
  return imgUrl;
  // return imgUrl.replace("pic1", "pic")
  //     .replace("pic2", "pic")
  //     .replace("pic3", "pic")
  //     .replace("pic4", "pic");
}