# 大术专搜

一个试图成为搜索总主页，并解决一切浏览器与搜索引擎之间的问题的浏览器扩展（及网站）。

最充分地利用不同的网络搜索引擎和查询系统。可将任意（已将许多）有输入搜索、查询功能（GET/POST）的网站集于一处操作，例如百度、Google、淘宝等，或某在线词典、你家附近的图书馆藏书查询等（易于自定义）。已收录超过50个各类引擎。

使用方式有：

1. 直接打开网页。可在不同类型浏览器使用。适合桌面及移动设备。
   
   主站 https://acsearch.ga    备用站 http://acsearch.tk
   
   > 记得看主页中的小技巧

2. 浏览器扩展。非常方便连续点击，无间断地一次调用多个搜索引擎。 
   
   - [Firefox](https://addons.mozilla.org/firefox/addon/big-search/) （主力支持）
   
   - Chrome、Vivaldi、Opera、Safari、Edge、搜狗浏览器 等 —— Comming soon...

不管是**普通搜索、网购、查资料、查字典**等，都可以将它作为浏览器上网的入口。此搜索工具不针对某一种类的搜索查询对象，它是通用的。注重搜索质量和广度的人的上网入口。

## 功能

- 可将各种搜索、查询的网站集于一处操作（任意支持普通GET/POST的网站）

- 纯客户端工具，无中转，无数据库服务器

- 分类卡片

- 可保存和管理你的输入历史（仅保存在浏览器本地）

- 支持桌面设备和移动设备（网页版）

- 快速将选择的网页上的文本作为搜索词（浏览器扩展，通过右键菜单）
    > Firefox无痕模式中无。Chrome中点了右键菜单后，需再点击工具栏中的图标

- 支持用户自定义搜索引擎

- 默认隐藏HTTP Referrer以保护用户隐私（网页版）


### 既然浏览器本身可添加搜索引擎，为什么用这个？

1. 浏览器本身的搜索引擎功能不支持POST

2. 这个可以连续点击，向多个不同引擎快速送出request，不需要再次输入或复制粘贴

3. 这个可跨浏览器快速迁移引擎数据

4. 分类功能允许用户添加很多很多引擎而不至于凌乱

5. 历史功能方便微调搜索词，这对于获得想要的搜索结果很关键

6. 从其他特性也可见，这个是一个更强大的工具

### 技术特性

使用JSON格式作为引擎数据库（包括自带的及用户自定义的）

除了普通的对某一个搜索引擎进行操作外，还具有：

- 对于一个引擎，支持不同的操作（一引擎，多按钮）

- 对用户输入进行字符串格式化

- 调用引擎库中的另一个引擎中的某一按钮动作，以实现对某一本身不支持搜索的网站进行搜索

### 计划

- 可调用浏览器内设的搜索引擎（浏览器扩展）

- 快速将网页文本框内容作为搜索词（浏览器扩展）

- 增加非搜索导航功能

- 兼容OpenSearch

## FAQ

**Q：我使用大术专搜来搜索时，输入的内容是否会被你们收集？**

A：不会，我们不收集任何用户输入的内容。输入的内容直接发送到你点击调用的对应网站，不会经过我们的服务器

**Q：为什么我看见PHP？需要通过服务器起作用？**

A: 不需要服务端，只需要浏览器。放心，没有多少PHP代码在里面，只需要HTML+JS+CSS。PHP只是给有扩展的空间。

**Q：我的搜索历史储存在哪里？**

A：仅储存在浏览器localStorage中

**Q：这个东西是开源的吗？是自由软件吗？为什么合并git的commit历史**

A：源代码已经上传，核心部分为自由代码（见具体的文件头部）。至于其他部分，只要有人支持或愿意参与，也可以给其余文件自由软件的License。合并git历史并没什么特别原因，如果有第二个人参与项目，那么便不会再合并历史

## 如何添加一个搜索引擎

只需要会简单的JSON，和GET/POST这一基本http request知识

### 例子

此处提供的例子可用于放入“用户自定”区域以供尝试

```json
{
    "yahoo": {
        "dname": "Yahoo Search",
        "addr": "https://search.yahoo.com",
        "action": "https://search.yahoo.com/search",
        "kw_key": "q"
    },

    "google": {
        "dname": "Google",
        "addr": "https://www.google.com",
        "action": "https://www.google.com/search",
        "kw_key": "q",
        "btns": {
            "search": {
                "label": "Google Search"
            },
            "lucky": {
                "label": "I'm Feeling Lucky",
                "params": [
                    {"key":"btnI", "val": "1"}
                ]
            }
        }
    },

    "flathub": {
        "dname": "Flathub",
        "addr": "https://flathub.org/apps",
        "action": "https://flathub.org/apps/search",
        "btns": {
            "Search": {
                "label": "Search",
                "full_url": "https://flathub.org/apps/search/{0}"
            }
        }
    },

    "itunesapps": {
        "dname": "iTunes Apps (Google)",
        "addr": "https://www.apple.com/itunes/charts/free-apps/",
        "kw_format": "{0} site:apple.com/*app",
        "btns": {
            "Search Apps": {
                "label": "Search Apps",
                "use_other_engine": {
                    "engine": "google",
                    "btn": "search"
                }
            }
        }
    }
}
```

### 数据与格式说明

用户使用了JSON自定义引擎后，我们还是希望用户能将数据提交回上游源代码。引擎数据为AGPL自由代码。

`enginesdata.js`是收录搜索引擎的数据，若要添加搜索引擎使被收录，往这里添加。

```javascript
//按钮之下的某些键值可覆盖引擎名下的键值
const sEngines = {
    "引擎名": {
        dname: "引擎显示名字", 
        addr: "主页URL", 
        tip: "引擎提示文字",  //可选
        action: "默认操作url", 
        //例如，https://search-engine.com/search?q=输入内容，
        //则action为https://search-engine.com/search
        kw_key: "query string中关键字的键名", //上例中，此处为q
        allow_referer: false, //  false(default)/true 可选
        method: "get/post",  //默认为get
        charset: "UTF-8/gb2312/gb18030/big5/....", //默认UTF-8
        kw_replace: [ [" ", "-"] ] ,  //可选，关键字中需要替换的字符，此例将空格替换为'-'
        kw_format: "格式化关键字{0}后的样子", //可选

        btns: {  // 若没有此项，则显示一个"搜索"按钮，点击按钮为默认行动
            "按钮名": {
                label: "按钮显示文字",
                btn_tip: "提示文字",
                params:[   // 可选，该操作所需的query string中关键字之外的键和值
                    {key: "键", val: "值"},
                    //例如，https://search-engine.com/search?q=输入内容&option=searchall
                    //则 {key: "option", val: "searchall"},
                ],
                full_url: "http://www.example.com/search/{0}",   //可选，使用get method时的整个url
                use_other_engine: { engine:"引擎名", btn:"按钮名" }, //可选，使用另一个引擎来操作
            },

        }
    },
    ......
};
```

## 国际化

尚未使用任何框架，只用了一个简单函数实现多语言。因为目前只有2种语言。

使用JS函数`i18n()`，其输入参数可以是：

- 一个字符串数组（仅中文及英文两种语言时用）。`[0]`内为中文，`[1]`内为英文

- 一个Object如 `{zh: "这是中文, en: "这是英文", fr: "这是法文"}`

该函数执行时会返回对应语言的一个字符串

如果你想添加一个仅针对某一语言用户的搜索引擎，可以在引擎数据中使用`visible_lang`，以使它只对某语言可见。

## 历史与代码状况

如果你读了代码，感谢你花了时间，抱歉这些代码最初是我一边摸索学习前端时一边写的个人项目。

这工具的代码一部分最早可以追溯到2008年左右。2015年首次发布在网上可公开使用。2020年代初有了对应的浏览器扩展版本。

代码一点点更改，明显它不是一项全职工作（作者自己身边的人群中也完全没有懂或使用HTML/JS/CSS的人）。

核心部分代码有过一些重构过，其余代码一直以“If it's not broken, don't fix it”的原则在使用。尽管有些UI代码不能叫很好（谁来帮下？），但**这个东西一直很好用。因此，欢迎Star和参与，有人参与与否决定本项目的动力。**
