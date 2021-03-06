const API_BASE = "https://news-at.zhihu.com/api";
const API_V4 = API_BASE + "/4";
const API_V3 = API_BASE + "/3";

const API_NEWS = API_V4 + "/news";
const API_STORY = API_V4 + "/story";

/**
 * 获取最新日报
 * @return {string}
 */
function getLatestNews() {
  return API_NEWS + "/latest";
}

/**
 * 获取日报详情
 * @param {int} newsId 日报id
 * @return {string}
 */
function getNewsDetail(newsId) {
  return API_NEWS + "/" + newsId;
}

/**
 * 获取以往日报
 * 知乎日报最早 20130519
 * @param {string} date 日期 yyyMMdd
 * @return {string}
 */
function getBeforeNews(date) {
  return "https://news.at.zhihu.com/api/4/news/before/" + date;
}

/**
 * 获取新闻额外的评论数量和点赞数量等信息
 * @param {int} newsId 日报id
 * @return {string}
 */
function getStoryExtraInfo(storyId) {
  return API_STORY + "-extra/" + storyId;
}

/**
 * 获取新闻对应长评
 * @param {int} storyId 新闻id
 * @return {string}
 */
function getStoryLongComments(storyId) {
  return API_STORY + "/" + storyId + "/long-comments";
}

/**
 * 新闻对应短评论查看
 * @param {int} storyId 新闻id
 * @return {string}
 */
function getStoryShortComments(storyId) {
  return API_STORY + "/" + storyId + "/short-comments";
}

/**
 * 获取左侧主题菜单列表
 * @return {string}
 */
function getTheme() {
  return API_V4 + "/themes";
}

/**
 * 获取对应栏目的数据
 * @param {string} themeId 导航栏目id
 */
function getThemeStories(themeId) {
  return API_V4 + "/theme/" + themeId;
}

/**
 * 获取启动界面封面
 * @param {string} size 图片尺寸 格式：width*height
 * @return {string}
 */
function getSplashCover(size) {
  return API_V4 + "/start-image/" + size;
}

module.exports = {
  getLatestNews: getLatestNews,
  getNewsDetail: getNewsDetail,
  getBeforeNews: getBeforeNews,
  getTheme: getTheme,
  getStoryExtraInfo: getStoryExtraInfo,
  getThemeStories: getThemeStories,
  getStoryShortComments: getStoryShortComments,
  getStoryLongComments: getStoryLongComments,
  getSplashCover: getSplashCover
}