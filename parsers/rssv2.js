var utils = require('./utils');
var model = require('../model/rss');

exports.parse = function(document) {
  let parsedFeed = Object.assign({}, model.rss);

  parsedFeed = mapChannelFields(document, parsedFeed);
  parsedFeed.type = 'rss-v2';
  parsedFeed.items = mapItems(document);

  return parsedFeed;
};

function mapChannelFields(document, parsedFeed) {
  const channelNodes = utils.getElements(document, 'channel');

  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }

  const channelNode = channelNodes[0];

  parsedFeed.title = getChannelTitle(channelNode);
  parsedFeed.links = getChannelLinks(channelNode);
  parsedFeed.description = getChannelDescription(channelNode);
  parsedFeed.language = getChannelLanguage(channelNode);
  parsedFeed.copyright = getChannelCopyright(channelNode);
  parsedFeed.authors = getChannelAuthors(channelNode);
  parsedFeed.lastUpdated = getChannelLastUpdated(channelNode);
  parsedFeed.lastPublished = getChannelLastPublished(channelNode);
  parsedFeed.categories = getChannelCategories(channelNode);
  parsedFeed.image = getChannelImage(channelNode);

  return parsedFeed;
}

function getChannelTitle(node) {
  return utils.getElementTextContent(node, 'title');
}

function getChannelLinks(node) {
  const links = utils.getChildElements(node, 'link');

  return links.map(function(link) {
    return {
      url: link.textContent,
      rel: link.getAttribute('rel')
    };
  });
}

function getChannelDescription(node) {
  return utils.getElementTextContent(node, 'description');
}

function getChannelLanguage(node) {
  return utils.getElementTextContent(node, 'language');
}

function getChannelCopyright(node) {
  return utils.getElementTextContent(node, 'copyright');
}

function getChannelAuthors(node) {
  const authors = utils.getElementTextContentArray(node, 'managingEditor');

  return authors.map(function(author) {
    return {
      name: author
    };
  });
}

function getChannelLastUpdated(node) {
  return utils.getElementTextContent(node, 'lastBuildDate');
}

function getChannelLastPublished(node) {
  return utils.getElementTextContent(node, 'pubDate');
}

function getChannelCategories(node) {
  const categories = utils.getElementTextContentArray(node, 'category');

  return categories.map(function(category) {
    return {
      name: category
    }
  });
}

function getChannelImage(node) {
  return {
    url: utils.getElementAttributeContent(node, 'image', 'url'),
    title: utils.getElementAttributeContent(node, 'image', 'title'),
    description: utils.getElementAttributeContent(node, 'image', 'description'),
    width: utils.getElementAttributeContent(node, 'image', 'width'),
    height: utils.getElementAttributeContent(node, 'image', 'height'),
  };
}

function mapItems(document) {
  const itemNodes = utils.getElements(document, 'item');

  return itemNodes.map(function(item) {
    return {
      title: getItemTitle(item),
      links: getItemLinks(item),
      description: getItemDescription(item),
      authors: getItemAuthors(item),
      categories: getItemCategories(item),
      published: getItemPublished(item),
      enclosures: getItemEnclosures(item)
    };
  });
}

function getItemTitle(node) {
  return utils.getElementTextContent(node, 'title');
}

function getItemLinks(node) {
  const links = utils.getChildElements(node, 'link');

  return links.map(function(link) {
    return {
      url: link.textContent,
      rel: link.getAttribute('rel')
    };
  });
}

function getItemDescription(node) {
  return utils.getElementTextContent(node, 'description');
}

function getItemAuthors(node) {
  const authors = utils.getElementTextContentArray(node, 'author');

  return authors.map(function(author) {
    return {
      name: author
    };
  });
}

function getItemCategories(node) {
  const categories = utils.getElementTextContentArray(node, 'category');

  return categories.map(function(category) {
    return {
      name: category
    }
  });
}

function getItemPublished(node) {
  return utils.getElementTextContent(node, 'pubDate');
}

function getItemEnclosures(node) {
  const enclosures = utils.getChildElements(node, 'enclosure');

  return enclosures.map(function(enclosure) {
    return {
      url: enclosure.getAttribute('url'),
      length: enclosure.getAttribute('length'),
      mimeType: enclosure.getAttribute('type')
    }
  });
}