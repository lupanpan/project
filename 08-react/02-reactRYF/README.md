### 注意
此react学习为阮一峰2015.03.31的教程，
版本为 react-0.13.4、react-dom-0.14.0 版本，
与现在的版本相差太大，这里就是学习一个入门，作为一个了解，不知道如何下手，就从这里开始吧！
好像版本号也没怎么变化。


### 要点
1. `$ babel src --out-dir build` 命令将src子目录的js文件进行语法转换，转码后的文件全部放在build子目录。
2. Browser.js 的作用是将 JSX 语法转换为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。
3. JSX语法：
    - HTML语言直接在 JavaScript 语言中，不加任何引号，允许 HTML 与 JavaScript 混写。
    - 遇到 HTML 标签(以 < 开头)，就用 HTML 规则解析；遇到代码块(以 { 开头)，就用 JavaScript 规则解析。

