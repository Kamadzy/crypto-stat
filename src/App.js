import { MainLayout } from './components/Grid';
import { CustomDialog } from './components/SearchModal';
import { createContext, useEffect, useState } from 'react';
import { getCoinsFromByBit, getCoinsFromBinance } from './api';
import { initSelectedBinance, initSelectedByBit } from './api/init';
import useLocalStorage from './hooks/useLocalStorage';

export const AppContext = createContext(null);

function App() {
  // default coins list
  const [ByBitCoins, setByBitCoins] = useState(null);
  const [BinanceCoins, setBinanceCoins] = useState(null);

  //default coins price
  const [byBitCoinsPrice, setByBitCoinsPrice] = useState(null);
  const [binanceCoinsPrice, setBinanceCoinsPrice] = useState(null);

  // selected coins list
  const [SelectedByBitCoins, setSelectedByBit] = useLocalStorage(
    'SelectedByBitCoins',
    initSelectedByBit,
  );
  const [SelectedBinanceCoins, setSelectedBinance] = useLocalStorage(
    'SelectedBinanceCoins',
    initSelectedBinance,
  );

  // get default coins list
  useEffect(() => {
    getCoinsFromByBit().then((ByBitCoins) => setByBitCoins(ByBitCoins));
    getCoinsFromBinance().then((BinanceCoins) => setBinanceCoins(BinanceCoins));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ByBitCoins,
        BinanceCoins,
        SelectedByBitCoins,
        SelectedBinanceCoins,
        setSelectedBinance,
        setSelectedByBit,
        byBitCoinsPrice,
        setByBitCoinsPrice,
        binanceCoinsPrice,
        setBinanceCoinsPrice,
      }}>
      <MainLayout />
      <CustomDialog />
    </AppContext.Provider>
  );
}

export default App;
