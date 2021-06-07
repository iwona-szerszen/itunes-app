import CONSTANTS from './CONSTANTS';

export const searchEntityItems = (phrase, entity) => {
  return fetch(`https://itunes.apple.com/search?term=${phrase}&entity=${entity}`, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export const lookupSelectedEntityItem = (itemId, entity) => {
  return fetch(`https://itunes.apple.com/lookup?id=${itemId}&entity=${entity}`, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export const convertMillisToMinAndSec = (millis) => {
  const min = Math.floor(millis / 60000);
  const sec = ((millis % 60000) / 1000).toFixed(0);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

export const isPriceValid = (price) => price >= 0;

export const getDollarSymbol = (currency) => currency === CONSTANTS.CURRENCY.USD ? '\u0024' : currency;
