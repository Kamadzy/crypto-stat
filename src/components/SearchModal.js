import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dialog } from 'primereact/dialog';
import { useCallback, useContext, useState } from 'react';
import { AppContext } from '../App';

export const CustomDialog = () => {
  const {
    ByBitCoins,
    BinanceCoins,
    SelectedByBitCoins,
    SelectedBinanceCoins,
    setSelectedBinance,
    setSelectedByBit
  } = useContext(AppContext);

  const [visible, setVisible] = useState(false);
  const invertVisibility = useCallback(() => setVisible((visible) => !visible), []);
  const [filteredBinanceCoins, setFilteredBinanceCoins] = useState(BinanceCoins);
  const [filteredByBitCoins, setFilteredByBitCoins] = useState(ByBitCoins);

  const searchBinanceCoins = (event) => {
    setTimeout(() => {
      let _filteredBinanceCoins;

      if (!event.query.trim().length) {
        _filteredBinanceCoins = [...BinanceCoins];
      } else {
        _filteredBinanceCoins = BinanceCoins.filter((elem) =>
          elem.symbol.toLowerCase().startsWith(event.query.toLowerCase())
        )
      }

      setFilteredBinanceCoins(_filteredBinanceCoins);
    }, 250);
  }

  const searchByBitCoins = (event) => {
    setTimeout(() => {
      let _filteredByBitCoins;

      if (!event.query.trim().length) {
        _filteredByBitCoins = [...ByBitCoins];
      } else {
        _filteredByBitCoins = BinanceCoins.filter((elem) =>
          elem.symbol.toLowerCase().startsWith(event.query.toLowerCase())
        )
      }

      setFilteredByBitCoins(_filteredByBitCoins);
    }, 250);
  }

  return (
    <div>
      <Button
        style={{ position: 'fixed', bottom: 10, left: 10 }}
        icon='pi pi-sliders-h'
        onClick={invertVisibility}
      />
      <Dialog
        visible={visible}
        onHide={invertVisibility}
        breakpoints={{ '960px': '75vw', '640px': '100vw' }}
        style={{ width: '50vw' }}>
        <h2>Selected coins</h2>
        <p>Type name here in the field...</p>
        <p>Coins from Binance</p>
        <div className='p-fluid'>
          <AutoComplete
            value={SelectedBinanceCoins}
            suggestions={filteredBinanceCoins}
            completeMethod={searchBinanceCoins}
            onChange={(e) => {
              const arr = e.value.map(el => ({ symbol: el.symbol, type: 'BinanceCoins' }));
              setSelectedBinance(arr);
            }}
            multiple
            dropdown
            field='symbol'
            style={{ width: '100%' }}
          />
        </div>
        <p>Coins from ByBit</p>
        <div className='p-fluid'>
          <AutoComplete
            value={SelectedByBitCoins}
            suggestions={filteredByBitCoins}
            completeMethod={searchByBitCoins}
            onChange={(e) => {
              const arr = e.value.map(el => ({ symbol: el.symbol, type: 'ByBitCoins' }));
              setSelectedByBit(arr)
            }}
            multiple
            dropdown
            field='symbol'
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginTop: 30 }}>
          <Button
            label='Close'
            icon='pi pi-check'
            onClick={() => invertVisibility()}
          />
        </div>
      </Dialog>
    </div>
  );
};
