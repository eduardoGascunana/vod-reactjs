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
    return key.split('.').reduce((acum, current) => {
      return typeof acum === "undefined" || acum === null ? acum : acum[current]
      }, obj);
  }
}

export default utils