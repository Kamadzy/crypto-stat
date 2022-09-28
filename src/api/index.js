// Binance
export const getCoinsFromBinance = () => {
  const BinanceCoins = localStorage.getItem('BinanceCoins');
  if (BinanceCoins) return Promise.resolve(JSON.parse(BinanceCoins));

  return fetch(`https://api.binance.com/api/v1/exchangeInfo`)
    .then((res) => res.json())
    .then(({ symbols }) => {
      const BinanceCoins = symbols.map(({ symbol }, i, t) => {
        return { i: symbol, y: 300, w: 4, h: 4, x: (t.length * 2) % 12 };
      });
      localStorage.setItem('BinanceCoins', JSON.stringify(BinanceCoins));
      return BinanceCoins;
    });
};

// export const getBinancePrice = (symbols) => {
//   return fetch(`https://api.binance.com/api/v3/ticker/price?symbols=${JSON.stringify(symbols)}`)
//     .then((res) => res.json())
//     .then((data) => data);
// };

// ByBit
export const getCoinsFromByBit = () => {
  const ByBitCoins = localStorage.getItem('ByBitCoins');
  if (ByBitCoins) return Promise.resolve(JSON.parse(ByBitCoins));

  return fetch(`https://api.bybit.com/spot/v3/public/symbols`)
    .then((res) => res.json())
    .then(({ result }) => {
      const ByBitCoins = result.list.map(({ name }, i, t) => {
        return { i: name, y: 300, w: 4, h: 4, x: (t.length * 2) % 12 };
      });
      localStorage.setItem('ByBitCoins', JSON.stringify(ByBitCoins));
      return ByBitCoins;
    });
};

// export const getByBitPrice = (symbols) => {
//   return fetch(
//     `https://api.bybit.com//spot/v3/public/quote/ticker/price?symbol=${JSON.stringify(symbols)}`,
//   )
//     .then((res) => res.json())
//     .then((data) => data);
// };
