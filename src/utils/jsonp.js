function jsonp(url, callbackName) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const name =
      callbackName || `jsonp_callback_${Math.round(100000 * Math.random())}`;

    if (url.indexOf("?") >= 0) {
      url += `&callback=${name}`;
    } else {
      url += `?callback=${name}`;
    }

    script.src = url;

    window[name] = function (data) {
      delete window[name];
      document.body.removeChild(script);
      resolve(data);
    };

    script.onerror = function () {
      delete window[name];
      document.body.removeChild(script);
      reject(new Error(`JSONP request to ${url} failed`));
    };

    document.body.appendChild(script);
  });
}

export default jsonp;
