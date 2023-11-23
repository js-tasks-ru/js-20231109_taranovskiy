/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let pathAsArray = path.split('.');

  return function getter(entity) {
    const firstElement = pathAsArray.at(0);

    if (pathAsArray.length === 1) {
      pathAsArray = path.split('.');
      return entity?.[firstElement];
    }

    pathAsArray.shift();
    return getter(entity[firstElement]);
  };
}
