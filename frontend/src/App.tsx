import React, { useEffect } from 'react';
import './App.css';
import TokenTable from './components/token_table/token_table.tsx';
import WalletList from './components/wallet_list/wallet_list.tsx';
import WalletForm from './components/wallet_form/wallet_form.tsx';
import { useDispatch } from 'react-redux';
import { fetchBalance } from './http/balance_api.ts';
import { updateAllToken, updateAllWallet } from './store/actions.ts';
import { fetchWallet } from './http/wallet_api.ts';
import AlertList from './components/alert_list/alert.tsx';

function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetchBalance().then((data) => dispatch(updateAllToken(data)));
        fetchWallet().then((data) => dispatch(updateAllWallet(data)));
    }, [])

    return (
        <div className="App">
            <div className='control-panel'>
                <WalletList/>
                <div className='button-wrapper'>
                    <WalletForm/>
                </div>
            </div>
            <TokenTable/>
            <AlertList/>
            <div className='footer'>v1.0.0</div>
        </div>
    );
}

export default App;
