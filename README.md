# react-native-rss-parser

> React Native compatible RSS parser

[![npm version](https://badge.fury.io/js/react-native-rss-parser.svg)](https://badge.fury.io/js/react-native-rss-parser)
[![Build Status](https://api.travis-ci.org/jameslawler/react-native-rss-parser.png?branch=master)](https://travis-ci.org/jameslawler/react-native-rss-parser)

Parse RSS data into a simple object structure. Currently supports;

- RSS 2.0 specification
- Atom 1.0 specification
- Itunes elements for both RSS 2.0 and Atom 1.0 feeds

** Added media:content image **

## Installation

```sh
npm install react-native-rss-parser --save
```

## Usage example

```js
import * as rssParser from 'react-native-rss-parser';

return fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss')
  .then((response) => response.text())
  .then((responseData) => rssParser.parse(responseData))
  .then((rss) => {
    console.log(rss.title);
    console.log(rss.items.length);
  });
```



