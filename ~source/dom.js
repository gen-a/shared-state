const jsdom = require('jsdom').jsdom;
const { JSDOM } = require('jsdom');
const { document } = (new JSDOM('<!doctype html><html><body></body></html>',
  {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
  })).window;

global.document = document;
global.window = document.defaultView;

propagateToGlobal(document.defaultView)

function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}