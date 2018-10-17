const regExp = /_\$\$_/

const utils = {
  locale: {
    symbol: '_$$_',
    format(txt, [key, ...keys]) {
      return txt.search(regExp) === -1
        ? txt
        : utils.locale.format(txt.replace(regExp, key), keys)
    }
  },
  getProp(obj, key) {
    key.split('.').reduce((o, x) =>
      (typeof o === "undefined" || o === null) ? o : o[x]
      , obj);
  }
}

export default utils