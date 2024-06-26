import React from 'react';
import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RemoveWallet from "./remove_wallet.tsx";
import "./wallet_item.css"
import { Wallet } from '../../types/index.ts';

type WalletItemProps = {
    indx: number;
    wallet: Wallet;
}

function WalletItem({indx, wallet}: WalletItemProps) {
    const [isCopy, setIsCopy] = useState<boolean>(false);

    const onCopyText = () => {
        setIsCopy(true);
        setTimeout(() => setIsCopy(false), 2000); // Reset status after 2 seconds
    };

    const formatter = (value) => {
        let settings = {} 
    
        settings["useGrouping"] = true;
        settings["minimumFractionDigits"] = 0;
        settings["maximumFractionDigits"] = 3;
    
        settings["style"] = "currency";
        settings["currencyDisplay"] = "narrowSymbol";
        settings["currency"] = "USD";
        
        let formatter = new Intl.NumberFormat("en-GB", settings);
        return  formatter.format(value);
    }

    return (
        <div 
            className="wallet_item_wrapper"
            data-testid="wallet_item"
        >
            <div className="wallet_item">
                <span className='wallet_item_name'>{wallet.wallet_name}</span>
                <div className='wallet_item_address'>
                    {wallet.wallet_address.slice(0,8)}
                    <CopyToClipboard text={wallet.wallet_address} onCopy={onCopyText}>
                        <div className="copy_address" data-testid="copy_button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                            </svg>
                            <div className="wallet_item_copy">
                                {
                                    !isCopy?
                                    "Copy":
                                    "Copied!"
                                }
                            </div>
                        </div>
                    </CopyToClipboard>
                </div>
                <span className='wallet_item_name wallet_item_price'>{formatter(wallet.wallet_sum)}</span>
            </div>
            <RemoveWallet data={wallet}/>
        </div>
    );
}

export default WalletItem;
