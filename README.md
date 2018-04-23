DuckDuckGoog
============

![DuckDuckGoog Logo](public/images/logo.png?raw=true "DuckDuckGoog Logo")

Use DuckDuckGo for !bangs and Google (or another search engine) for everything else!


Local Setup
-----------
1. Clone the repository: `git clone -b local https://github.com/vinceau/duckduckgoog`
2. Install dependencies using: `npm install --save`.
3. Run `run.sh` to start DuckDuckGoog on [127.0.0.1:6006](http://127.0.0.1:6006).
4. Set it up so that `run.sh` is executed automatically on login. You may want to set it as your default search engine, or the default fallback for [Alfred](https://www.alfredapp.com/).


Custom Default Search Engine
----------------------------

Want to use a search engine other than Google as the default? Easy! Simply pass in the `searchengine` query parameter with `%q` as the replacement string.

### Examples

Engine | URL
------ | ---
Bing   | http://localhost:6006/?q=%s&searchengine=https://www.bing.com/search?q=%q
Yahoo  | http://localhost:6006/?q=%s&searchengine=https://search.yahoo.com/search?p=%q
Baidu  | http://localhost:6006/?q=%s&searchengine=https://www.baidu.com/s?wd=%q


Google Localisation
-------------------

By default [google.com](https://google.com) is used but if you would prefer to specify your own Google Localisation such as [google.com.au](https://google.com.au) or [google.co.jp](https://google.co.jp) you can do so using the `google` parameter.

### Examples

Localisation | URL
------------ | ---
Australia    | http://localhost:6006/?q=%s&google=www.google.com.au
Japan        | http://localhost:6006/?q=%s&google=www.google.co.jp
France       | http://localhost:6006/?q=%s&google=www.google.fr


