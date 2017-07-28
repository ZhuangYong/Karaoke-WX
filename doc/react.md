### 简易教程

创建一个新的HTML文档：

```html
<!-- index.html -->
<html>
  <head>
    <title>Hello React</title>
    <script src="http://fb.me/react-{{site.react_version}}.js"></script>
    <script src="http://fb.me/JSXTransformer-{{site.react_version}}.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.0.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/jsx">
      // Your code here
    </script>
  </body>
</html>
```

其余的部分，在此script标签中编写的JavaScript代码。

> 注意：
>
> 简化ajax请求代码，所以在这里引入jQuery，但是它对 React 并不是必须的。

### 第一个组件

React中全是模块化、可组装的组件。以的评论框为例，将有如下的组件结构：

```
- CommentBox
  - CommentList
    - Comment
  - CommentForm
```

构造`CommentBox`组件，它只是一个简单的 `<div>` 而已：

```javascript
// tutorial1.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
);
```

#### JSX语法

首先你注意到JavaScript代码中XML式的语法语句。有一个简单的预编译器，用于将这种语法糖转换成纯的JavaScript代码：

```javascript
// tutorial1-raw.js
var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: "commentBox"},
        "Hello, world! I am a CommentBox."
      )
    );
  }
});
React.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);
```

JSX语法是可选的，但是JSX语句比纯JavaScript更加容易使用。阅读更多关于[JSX语法的文章](/react/docs/jsx-in-depth.html)。

#### 发生了什么

通过JavaScript对象传递一些方法到`React.createClass()`来创建一个新的React组件。其中最重要的方法是`render`，该方法返回一颗React组件树，这棵树最终将会渲染成HTML。

这个`<div>`标签不是真实的DOM节点；他们是React`div`组件的实例。你可以认为这些就是React知道如何处理的标记或者一些数据。React是**安全的**。不生成HTML字符串，因此默认阻止了XSS攻击。

你没有必要返回基本的HTML。你可以返回一个你（或者其他人）创建的组件树。这就使得React变得**组件化**：一个关键的前端维护原则。

`React.render()`实例化根组件，启动框架，注入标记到原始的DOM元素中，作为第二个参数提供。

## 制作组件

为`CommentList`和`CommentForm`构建骨架，这也会是一些简单的`<div>`：

```javascript
// tutorial2.js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
```

下一步，更新`CommentBox`组件，使用这些新的组件：

```javascript{6-8}
// tutorial3.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});
```

注意是如何混合HTML标签和创建的组件。HTML组件就是普通的React组件，就像你定义的一样，只有一点不一样。JSX编译器会自动重写HTML标签为`React.createElement(tagName)`表达式，其它什么都不做。这是为了避免全局命名空间污染。

### 组件属性

创建第三个组件，`Comment`。传递给它作者名字和评论文本，以便于能够对每一个独立的评论重用相同的代码。首先添加一些评论到`CommentList`：

```javascript{6-7}
// tutorial4.js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});
```

请注意，已经从父节点`CommentList`组件传递给子节点`Comment`组件一些数据。例如，传递了*Pete Hunt*（通过一个属性）和*This is one comment*（通过类似于XML的子节点）给第一个`Comment`。从父节点传递到子节点的数据称为**props**，是属性（properties）的缩写。

### 使用props

创建评论组件。使用**props**，就能够在其中读取到从`CommentList`传递过来的数据，然后渲染一些标记：

```javascript
// tutorial5.js
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
```

在JSX中通过将JavaScript表达式放在大括号中（作为属性或者子节点），你可以生成文本或者React组件到节点树中。访问传递给组件的命名属性作为`this.props`的键，任何内嵌的元素作为`this.props.children`。

### 添加Markdown

Markdown是一种简单的格式化内联文本的方式。例如，用星号包裹文本将会使其强调突出。

首先，添加第三方的**Showdown**库到你的应用。这是一个JavaScript库，处理Markdown文本并且转换为原始的HTML。这需要在你的头部添加一个script标签（已经在React操练场上包含了这个标签）：

```html{7}
<!-- index.html -->
<head>
  <title>Hello React</title>
  <script src="http://fb.me/react-{{site.react_version}}.js"></script>
  <script src="http://fb.me/JSXTransformer-{{site.react_version}}.js"></script>
  <script src="http://code.jquery.com/jquery-1.10.0.min.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js"></script>
</head>
```

下一步，转换评论文本为Markdown格式，然后输出它：

```javascript{2,10}
// tutorial6.js
var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {converter.makeHtml(this.props.children.toString())}
      </div>
    );
  }
});
```

在这里唯一需要做的就是调用Showdown库。需要把`this.props.children`从React的包裹文本转换成Showdown能处理的原始的字符串，所以显示地调用了`toString()`。

但是这里有一个问题！渲染的评论在浏览器里面看起来像这样：“`<p>`This is `<em>`another`</em>` comment`</p>`”。想这些标签真正地渲染成HTML。

那是React在保护你免受XSS攻击。这里有一种方法解决这个问题，但是框架会警告你别使用这种方法：

```javascript{5,11}
// tutorial7.js
var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{"{{"}}__html: rawMarkup}} />
      </div>
    );
  }
});
```

这是一个特殊的API，故意让插入原始的HTML变得困难，但是对于Showdown，将利用这个后门。

**记住：** 使用这个功能，你会依赖于Showdown的安全性。

### 接入数据模型

到目前为止，已经在源代码里面直接插入了评论数据。相反，渲染一小块JSON数据到评论列表。最终，数据将会来自服务器，但是现在，写在你的源代码中：

```javascript
// tutorial8.js
var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];
```

需要用一种模块化的方式将数据传入到`CommentList`。修改`CommentBox`和`React.render()`方法，通过props传递数据到`CommentList`：

```javascript{7,15}
// tutorial9.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
```

现在数据在`CommentList`中可用了，动态地渲染评论：

```javascript{4-10,13}
// tutorial10.js
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
```

就是这样！

### 从服务器获取数据

用一些从服务器获取的动态数据替换硬编码的数据。将移除数据属性，用获取数据的URL来替换它：

```javascript{3}
// tutorial11.js
React.render(
  <CommentBox url="comments.json" />,
  document.getElementById('content')
);
```

这个组件和前面的组件是不一样的，因为它必须重新渲染自己。该组件将不会有任何数据，直到请求从服务器返回，此时该组件或许需要渲染一些新的评论。

### 响应状态变化（Reactive state）

到目前为止，每一个组件都根据自己的props渲染了自己一次。`props`是不可变的：它们从父节点传递过来，被父节点“拥有”。为了实现交互，给组件引进了可变的**state**。`this.state`是组件私有的，可以通过调用`this.setState()`来改变它。当状态更新之后，组件重新渲染自己。

`render()` methods are written declaratively as functions of `this.props` and `this.state`. 框架确保UI始终和输入保持一致。

当服务器获取数据的时候，用已有的数据改变评论。给`CommentBox`组件添加一个评论数组作为它的状态：

```javascript{3-5,10}
// tutorial12.js
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
```

`getInitialState()`在组建的生命周期中仅执行一次，设置组建的初始化状态。

#### 更新状态

当组建第一次创建的时候，从服务器获取（使用GET方法）一些JSON数据，更新状态，反映出最新的数据。在真实的应用中，这将会是一个动态功能点，但是对于这个例子，会使用一个静态的JSON文件来使事情变得简单：

```javascript
// tutorial13.json
[
  {"author": "Pete Hunt", "text": "This is one comment"},
  {"author": "Jordan Walke", "text": "This is *another* comment"}
]
```

使用jQuery帮助发出一个一步的请求到服务器。

注意：因为这会变成一个AJAX应用，你将会需要使用一个web服务器来开发你的应用，而不是一个放置在你的文件系统上面的一个文件。[如上所述](#running-a-server)，在[GitHub](https://github.com/reactjs/react-tutorial/)上面提供了几个你可以使用的服务器。这些服务器提供了你学习下面教程所需的功能。

```javascript{6-17}
// tutorial13.js
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
```

在这里，`componentDidMount`是一个在组建被渲染的时候React自动调用的方法。动态更新的关键点是调用`this.setState()`。把旧的评论数组替换成从服务器拿到的新的数组，然后UI自动更新。正是有了这种响应式，一个小的改变都会触发实时的更新。这里将使用简单的轮询，但是你可以简单地使用WebSockets或者其它技术。

```javascript{3,14,19-20,34}
// tutorial14.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);

```

在这里所做的就是把AJAX调用移到一个分离的方法中去，组件第一次加载以及之后每隔两秒钟，调用这个方法。尝试在你的浏览器中运行，然后改变`comments.json`文件；在两秒钟之内，改变将会显示出来！

### 添加新的评论

现在是时候构造表单了。`CommentForm`组件应该询问用户的名字和评论内容，然后发送一个请求到服务器，保存这条评论。

```javascript{5-9}
// tutorial15.js
var CommentForm = React.createClass({
  render: function() {
    return (
      <form className="commentForm">
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```

使表单可交互。当用户提交表单的时候，应该清空表单，提交一个请求到服务器，然后刷新评论列表。首先，监听表单的提交事件和清空表单。

```javascript{3-14,17-20}
// tutorial16.js
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```

##### 事件

React使用驼峰命名规范的方式给组件绑定事件处理器。给表单绑定一个`onSubmit`处理器，用于当表单提交了合法的输入后清空表单字段。

在事件回调中调用`preventDefault()`来避免浏览器默认地提交表单。

##### Refs

利用`Ref`属性给子组件命名，`this.refs`引用组件。可以在组建上调用`getDOMNode()`获取浏览器本地的DOM元素。

##### 回调函数作为属性

当用户提交评论的时候，需要刷新评论列表来加进这条新评论。在`CommentBox`中完成所有逻辑是合适的，因为`CommentBox`拥有代表评论列表的状态（state）。

需要从子组件传回数据到它的父组件。在父组件的`render`方法中做这件事：传递一个新的回调函数（`handleCommentSubmit`）到子组件，绑定它到子组件的`onCommentSubmit`事件上。无论事件什么时候触发，回调函数都将会被调用：

```javascript{15-17,30}
// tutorial17.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    // TODO: submit to the server and refresh the list
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
```

当用户提交表单的时候，在`CommentForm`中调用这个回调函数：

```javascript{10}
// tutorial18.js
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```

现在回调函数已经就绪，唯一需要做的就是提交到服务器，然后刷新列表：

```javascript{16-27}
// tutorial19.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
```

###  优化：提前更新

应用现在已经完成了所有功能，但是在你的评论出现在列表之前，你必须等待请求完成，感觉很慢。可以提前添加这条评论到列表中，从而使应用感觉更快。

```javascript{16-18}
// tutorial20.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
```
