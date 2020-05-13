# Big Search

A browser extension (also a website) that tries to be the main universal online search home and solve all problems between browser and search engines. 

> Also known as 大术专搜. [中文版](README_zh.md)

Make the best use of different web search engines and inquery systems. Able to collect any websites (and have collected many) that provide inputting, searching or inquiring interface (GET/POST) and operate them on one page. For example, Google, Amazon/eBay, an online dictionary, or the holding of the library near your home (easy to customize). Has included different types of more than 40 search engines.



Ways to use:

1. Open web page directly. Can be used in different types of browsers. Suitable for desktop and mobile devices.
   
   Main site https://acsearch.ga   Standby site http://acsearch.tk
   
   > Remember to read the tips in the homepage

2. Browser extension. Convenient to use multiple search engines at once without interruption by continuously clicking.
   
   - [Firefox](https://addons.mozilla.org/firefox/addon/big-search/) (Main support)
   
   - Chrome, Vivaldi, Opera, Safari, Edge etc. : Comming soon...

You can use it as the entrance portal for the browser to Internet, no matter you are going to do **ordinary search, dictionary lookup, information search, knowledge search, online shopping** etc. This search tool is not created for a certain kind of target thing, it's universal. Portal for people who value search quality and breadth.

## Features

- Able to collect many different searching or inquery websites and operate them on one page (any website that supports general GET/POST request)

- Pure client-side tool. No server transfer. No database server

- Search engines catagory

- Save and manage your input history (only saved locally in the browser)

- Support desktop and mobile devices (web version)

- Quickly use user selected text on webpage as search term (browser extension, through context menu) 
    > Not in Firefox incognito mode. On Chrome, after clicking context menu item, click the icon on toolbar

- Support user-defined search engine

- Hide HTTP Referrer by default to protect user privacy (web version)


### Since the browser itself has search engines, why use this?

1. The browser ones does not support POST

2. This provide ability to send requests to multuple different engines quickly without retyping or copy-and-paste

3. This is cross-browser, and the engines data can be easily migrate

4. Catagory feature allows adding many engines without clutter

5. The history function makes easy to tweak and try different search terms, which is very important to get the desired search results

6. From other features we can see this is a more powerful tool 

### Technical Features

Uses JSON for search engines database (both built-in and user-defined)

In addition to ordinary operations on a certain search engine:

- For one engine, different operations are supported (one engine, multiple buttons)

- String formatting user's inputted keyword

- Call another engine (or engine's certain action) to do the action

### Plan

- Support using in-browser search engines (browser extension)

- Quickly use the content of the webpage text box as search term (browser extension)

- Quickly use the content of the address bar as search term (browser extension)

- Add non-search navigation function

- Be compatible with OpenSearch

## FAQ

**Q: When I use the BigSearch Homepage to search, will the inputted content be collected by you?**

A: No, we do not collect any user input. The entered content is sent directly to the corresponding website you choose by clicking, without going through our server

**Q: Why is it PHP? Work only with the server?**

A: No server is required, only a browser is required. Don't worry, there is not much PHP code in it, just HTML+JS+CSS. PHP just provides posibility for expansion

**Q: Where is my search history stored?**

A: Only stored in the browser localStorage

**Q: Is this thing open source? Is it free software? Why merge the commit history of git**

A: The source code has been uploaded, and the core part is FOSS (see file headers). As for the other parts, if people choose us or someone is willing to participate, we can also give the remaining files FOSS license. There is no special reason that I merging git history. If there is a second person involved in writing the code, then the history will not be merged any more

## How to add a search engine

You only need to write JSON and basic http request knowledge about GET/POST

### Examples

The examples provided here can be put into the "user custom" area

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

### Data and format specification

We hope user can submit their customized search engines data to us after they try JSON customing. Search engines data is AGPL licensed FLOSS.

If you want some search engines to be included by us, add/submit it to `enginesdata.js`, it is the core data of Big Search.

### Format

```javascript
//Some key/value ​​in the button can override the key/value in the engine name
const sEngines = {
    "engine_name": {
        dname: "Engine display name",
        addr: "Homepage URL",
        tip: "Engine tip text", //optional
        action: "default action url",
        //For example, https://search-engine.com/search?q=input_content,
        //The action is https://search-engine.com/search
        kw_key: "The key name of the keyword in the query string", //In above example, it is q
        allow_referer: false, // false(default)/true optional
        method: "get/post", //The default is get
        charset: "UTF-8/gb2312/gb18030/big5/iso-xxxx....", //default UTF-8
        kw_replace: [[" ", "-"]], //Optional, characters that need to be replaced in the keyword, in this example, replace spaces with '-'
        kw_format: "formatting the keyword {0}", //optional
        btns: {// If there is no such item, a "search" button is displayed, and clicking the button will do the default action
            "Button name": {
            label: "Button display text",
            btn_tip: "Tip text",
            params:[ // Optional, the key/value other than the keyword in the query string required for this operation
                {key: "key", val: "value"},
                //For example, https://search-engine.com/search?q=input_content&option=searchall
                //so {key: "option", val: "searchall"},
            ],
            full_url: "http://www.example.com/search/{0}", //optional, the entire url using get method
            use_other_engine: {engine:"engine name", btn:"button name" }, //optional, use another engine to do an action
            },
        }
    },
    ......
};
```

### Globalization

No framework has been used yet, only a simple function to implement multi-language. Because there are currently only 2 languages.

Use JS function `i18n()`, whose input parameters can be:

- An array of strings (for only Chinese and English 2 languages). `[0]` is Chinese, `[1]` is English

- An Object like `{zh: "This is Chinese, en: "This is English", fr: "This is French"}`

It will return a string of the corresponding language

If you want to add a search engine that only targets users in a certain language, you can use `visible_lang` to make it visible only to a certain language.

## History and code status

If you read the code, thank you for taking the time. I'm sorry that the code was originally a personal project I wrote while learning front-end.

A part of the code of this tool can be traced back to around 2008. Published to be usable to the public on Internet in 2015. In the early 2020s there borned a corresponding browser extension.

The code has been changing a little by a little, obviously it is not a full-time job (and author himself has no cooporator around who understand or use HTML/JS/CSS).

The core part's code has been ever refactored, and the rest of code is being used with the principle "If it's not broken, don't fix it". Although some UI code is not enough to call awesome (anyone could help me?), **this tool has always been very useful. So, welcome to star or participate. Your participation can be motivation of this project.**
