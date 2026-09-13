(function () {
  var BASE = '/baigiukymophong';
  window.__PANOEE_BASE_PATH__ = BASE;
  window.__PANOEE_BASE_URL__ = BASE + '/';
  function fixUrl(url) {
    if (typeof url !== 'string') return url;
    if (url === '/') return BASE + '/';
    if (url.charAt(0) === '/' && url.indexOf('//') !== 0 && url.indexOf(BASE + '/') !== 0 && url !== BASE) return BASE + url;
    return url;
  }
  var originalFetch = window.fetch;
  if (originalFetch) window.fetch = function (input, init) {
    try {
      if (typeof input === 'string') input = fixUrl(input);
      else if (input && input.url) input = new Request(fixUrl(input.url), input);
    } catch (e) {}
    return originalFetch.call(this, input, init);
  };
  var originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    var args = Array.prototype.slice.call(arguments);
    args[1] = fixUrl(url);
    return originalOpen.apply(this, args);
  };
})();
