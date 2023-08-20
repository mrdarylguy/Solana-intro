import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {

  const [walletAddress, setWalletAddress] = useState(null)

  window.onload = async function () {
    try {
      if (window.solana) {
        const solana = window.solana 
        if (solana.isPhantom) {
          console.log('Phantom Wallet found!')
          const res = await solana.connect({ onlyIfTrusted: true})
          console.log('Connected with Public Key:', res.publicKey.toString())
          setWalletAddress(res.publicKey.toString())
        }
      } else {
        alert('Wallet not found! Pls download Phantom')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const connectwallet = async() => {
    if (window.solana) {
      const solana = window.solana
      const res = await solana.connect()
      setWalletAddress(res.publicKey.toString())
    } else {
      alert('Wallet not found! Pls download Phantom Wallet')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {!walletAddress && (
          <div>
            <button className="btn" onClick={connectwallet}>
              Connect Wallet
            </button>
          </div>
        )}

        {walletAddress && (
          <div>
            <p>
              Connected account : {''}
              <span className="address"> {walletAddress}</span>
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
