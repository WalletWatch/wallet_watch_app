import React from 'react';
import * as copy from 'copy-to-clipboard';
import { useRef, useState } from "react";
import RemoveWallet from "./RemoveWallet.tsx";
import "./WalletItem.css"

type Wallet = {
    id: number;
    wallet_name: string;
    wallet_address: string;
}

type WalletItemProps = {
    indx: number;
    wallet: Wallet;
}

function WalletItem({indx, wallet}: WalletItemProps) {
    const [isCopy, setIsCopy] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null!);

    function copyText() {
        // navigator.clipboard.writeText(wallet.wallet_address);
        copy(wallet.wallet_address);
        setIsCopy(true);

        ref.current?.addEventListener('mouseleave', () => setIsCopy(false));
    }

    return (
        <div className="wallet_item">
            <div className="wallet_item">
                <span className='wallet_item_name'>{wallet.wallet_name}</span>
                <div className='wallet_item_address'>
                    {wallet.wallet_address.slice(0,8)}
                    <div className="copy_address" onClick={copyText} ref={ref}>
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
                </div>
            </div>
            <RemoveWallet data={wallet}/>
        </div>
    );
}

export default WalletItem;
