/* eslint-disable */
import React from 'react'
import "./wallet_form.css"
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { addWallet } from "../../store/actions.ts";
import { createWallet } from "../../http/wallet_api.ts";


type Error = {
    address?: string,
    name?: string
}

type Wallet = {
    name: string,
    address: string,
}

function WalletForm() {
    const dispatch = useDispatch();

    const [wallet, setWallet] = useState<Wallet>({name:"", address:""});
    const [errors, setErrors] = useState<Error>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const div = document.querySelector( '#wallet_form');
        
        function unShowForm(e:any) {
            const withinBoundaries = e.composedPath().includes(div);
        
            if (!withinBoundaries ) {
                setShow(false); 
            }
        };

        document.addEventListener( 'click', unShowForm)

        return () => {
            document.removeEventListener('click', unShowForm);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit();
        }
    }, [errors]);

    const validateWallet = (inputValues: Wallet) => {
        let errors:Error = {};
        if (inputValues.address.length < 10) {
            errors.address = "Address is too short";
        }
        if (inputValues.name.length < 3) {
            errors.name = "Name is too short";
        }
    
        return errors;
    };

    const handleClickButton = (e:any) => {
        e.preventDefault();

        if (submitting) return;
        setErrors(validateWallet(wallet));

        setSubmitting(true);
    }

    const finishSubmit = () => {
        const newWalet:FormData = new FormData();
        newWalet.append('wallet_name', wallet.name);
        newWalet.append('wallet_address', wallet.address);

        createWallet(newWalet)
        .then(data => { dispatch(addWallet(data)) })
        .then(() => {
                setShow(false);
                setWallet({name:"", address:""});
                setSubmitting(false);
        })
        .catch((err) => {
            if (err.response) {
                setErrors({address: err.response.data});
            } else {
                console.log("An error occurred:", err.message);
            }
            setSubmitting(false);
        });
    }

    const clickShowButton = () => {
        setShow(prevState => !prevState);
        setErrors({});
        setWallet({name:"", address:""});
        setSubmitting(false);
    }

    return (
        <div id='wallet_form' style={{position:"relative"}}>
            <button 
                className={
                            show?
                                "wallet_button display_form display_form_show":
                                "wallet_button display_form"
                        }
                onClick={clickShowButton}
            >
                Add wallet
            </button>
            <form 
                className="wallet_form"
                data-testid="wallet-form"
                style={{display: show?"flex":"none"}}
            >
                <label htmlFor="wallet_name">Wallet name</label>
                <input 
                    id="wallet_name"
                    className="wallet_input" 
                    placeholder="Input name for wallet..."
                    type="text"

                    value={wallet.name}
                    onChange={e => {
                        setWallet({...wallet, name : e.target.value});
                    }}
                    required
                ></input>
                {errors.name ? (
                    <p className="error">{errors.name}</p>
                ) : null}
                <label htmlFor="wallet_address">Wallet address</label>
                <textarea 
                    id="wallet_address"
                    className="wallet_input" 
                    placeholder="Input wallet address..."

                    value={wallet.address}
                    onChange={e => {
                        setWallet({...wallet, address : e.target.value});
                    }}
                    required
                ></textarea>
                {errors.address ? (
                    <p className="error">{errors.address}</p>
                ) : null}
                <button 
                    className="wallet_button"
                    style={{cursor: submitting?"not-allowed":"pointer"}}
                    onClick={handleClickButton}
                >
                    Add new wallet
                </button>
            </form>
        </div>
    );
}

export default WalletForm;
