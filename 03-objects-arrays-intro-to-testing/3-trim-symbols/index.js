/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }

  const symbolsAsArray = string.split('');

  let equalSymbolsCount = 1;

  return symbolsAsArray.reduce((acc, currentSymbol, index, array) => {
    const nextSymbol = array[index + 1];
    const isSymbolsEqual = currentSymbol === nextSymbol;
    const outOfSize = equalSymbolsCount >= size;

    if (isSymbolsEqual && outOfSize) {
      return acc;
    } else if (isSymbolsEqual && !outOfSize) {
      equalSymbolsCount += 1;
      return acc + currentSymbol;
    }
    equalSymbolsCount = 1;
    return acc + currentSymbol;
  }, '');
}
