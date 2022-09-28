import React, { useContext, useMemo, useEffect } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { getBinancePrice, getByBitPrice } from '../api';
import { AppContext } from '../App';
import { GridItem } from './GridItem';
import useLocalStorage from '../hooks/useLocalStorage';

const CustomGridLayout = WidthProvider(Responsive);

export const MainLayout = () => {
  const {
    SelectedBinanceCoins,
    SelectedByBitCoins,
    setByBitCoinsPrice,
    setBinanceCoinsPrice,
    setSelectedByBit,
    setSelectedBinance,
  } = useContext(AppContext);

  const SelectedCoins = useMemo(
    () => [...SelectedBinanceCoins, ...SelectedByBitCoins],
    [SelectedBinanceCoins, SelectedByBitCoins],
  );
  const [selectedCoins, setSelectedCoins] = useLocalStorage('combinedSelectedCoins', SelectedCoins);
  // useEffect(() => {
  //   const binanceInterval = setInterval(
  //     () => getBinancePrice(SelectedBinanceCoins).then((prices) => setBinanceCoinsPrice(prices)),
  //     2000,
  //   );
  //   const byBitInterval = setInterval(
  //     () => getByBitPrice(SelectedByBitCoins).then((prices) => setByBitCoinsPrice(prices)),
  //     2000,
  //   );
  //   return () => {
  //     clearInterval(binanceInterval);
  //     clearInterval(byBitInterval);
  //   };
  // }, [SelectedCoins, setByBitCoinsPrice, setBinanceCoinsPrice]);

  return (
    <div>
      <CustomGridLayout
        layout={selectedCoins}
        onLayoutChange={(val) => setSelectedCoins(val)}
        className={'layout'}
        rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
        {SelectedCoins.map((el, i) => (
          <p key={el.type + el.symbol + i}>
            {el.symbol} - {el.type}
          </p>
        ))}
      </CustomGridLayout>
    </div>
  );
};
