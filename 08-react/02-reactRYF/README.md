### 注意
此react学习为阮一峰2015.03.31的教程，
版本为 react-0.13.4、react-dom-0.14.0 版本，
与现在的版本相差太大，这里就是学习一个入门，作为一个了解，不知道如何下手，就从这里开始吧！
好像版本号也没怎么变化。


### 要点
1. `$ babel src --out-dir build` 命令将src子目录的js文件进行语法转换，转码后的文件全部放在build子目录。
2. Browser.js 的作用是将 JSX 语法转换为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。

### JSX语法：
- HTML语言直接在 JavaScript 语言中，不加任何引号，允许 HTML 与 JavaScript 混写（查看demo1）。
- 遇到 HTML 标签(以 < 开头)，就用 HTML 规则解析；遇到代码块(以 { 开头)，就用 JavaScript 规则解析（查看demo2）。
- JSX 允许直接在模板中插入 JavaScript 变量，如果这个变量是一个数组，则会展开这个数组的所有成员（查看demo3）。
- 样式语法：style={{opacity: this.state.opacity}}，React 组件样式是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。

### 组件：
- React 允许将代码封装成组件(component)，然后像插入普通 HTML 标签一样，在网页中插入这个组件。
- React.createClass 方法就用于生成一个组件类（查看demo4）。
- 所有的组件类都必须有自己的 render 方法，用于输出组件。
- 组件是组件类的实例。
- 组件的用法与原生的 HTML 标签完全一致，可以任意加入属性。
- 组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性可以通过 this.props.name 读取。
注意：
1. 组件类的第一个字母必须大写，否则会报错。
2. 组件类只能包含一个顶层标签，否则也会报错。
3. 组件添加熟悉性时， class 属性要写成 className，for 属性要写成 htmlFor，因为 class 和 for 是 JavaScript 的保留字。

### this.props.children
- 表示组件的所有子节点（查看demo5）。
- this.props.children 的值有三种可能：
    1. 如果当前组件没有子节点，它就是 undefined；
    2. 如果有一个子节点，数据类型是 object；
    3. 如果有多个子节点，数据类型是 array；
- React 提供一个工具方法 React.Children 来处理 this.props.children，可以用 React.Children.map 来遍历子节点，不用担心 this.props.children 的数据类型问题。

### PropTypes
- 组件的属性可以接受任意值，字符串、函数、对象等等都可以。
- 组件类的 PropTypes 属性，用来验证组件实例的属性是否符合要求（查看demo6）。

### getDefaultProps
- getDefaultProps 方法可以用来设置属性的默认值。

### 获取真实的 DOM 节点，ref 属性
- 组件不是真实的 DOM 节点，是存在于内存之中的一种数据结构，叫做虚拟 DOM（virtual DOM）。
  只有当它插入文档以后，才会变成真实的 DOM。
  根据 react 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM 上，
  这种算法叫做 DOM diff，它可以极大提高网页的性能表现。
- 有时需要从组件获取真实 DOM 的节点，这时要用到 ref 属性。（查看demo7）。

### this.state
- 组件免不了与用户互动，将组件看成一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI（查看demo8）。
- getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。
- this.setState 方法就修改状态值，每次修改后，自动调用this.render 方法，再次渲染组件。
- this.props 和 this.state 都用于描述组件的特性，可能产生混淆。
  一个简单的区分方法是：
  this.props 表示那些一旦定义，就不再改变的特性；
  this.state 是会随着用户互动而产生变化的特性。

### 表单
- 用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取（查看demo9）。
- 在事件中，使用 event.target.value 读取用户输入的值。

### 组件的生命周期
- 组件的生命周期分成三个状态：
  1. Mounting：已插入真实 DOM
  2. Updating：正在被重新渲染
  3. Unmounting：已移除真实 DOM
- React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。
  1. componentWillMount()
  2. componentDidMount()
  3. componentWillUpdate(object nextProps, object nextState)
  4. componentDidUpdate(object prevProps, object prevState)
  5. componentWillUnmount()
- 此外，react 还提供了两种特殊状态的处理函数。
  1. componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
  2. shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新时调用
- 具体用法查看（查看demo10）

### Ajax
- 组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，
  等到请求成功，再用 this.setState 方法重新渲染 UI（查看demo11）
- 甚至可以把一个 Promise 对象传入组件（查看demo12）

