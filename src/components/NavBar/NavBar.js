import './NavBar.css';
import React, { useEffect, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import logoImg from '../../assets/img/logo.png';
import { connectWallet, getCurrentWalletConnected } from '../../helpers/wallet';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';

export const NavBar = () => {
  const [walletStatus, setWalletStatus] = useState("Connect Wallet");
  const { walletAddress, handleWalletAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initWallet = async () => {
      if (window.ethereum) {
        const { address } = await getCurrentWalletConnected();
        if (address) {
          handleWalletAddress(address);
          setWalletStatus("Connected");
        }
      }
    };
    initWallet();
  }, [handleWalletAddress]);

  const handleConnectWallet = async () => {
    const { address, status } = await connectWallet();
    if (address) {
      handleWalletAddress(address);
      setWalletStatus("Connected");
    } else {
      NotificationManager.error(status);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logoImg} alt="Logo" />
        </Link>
        <ul className="nav-links">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/promote" ? "active" : ""}>
            <Link to="/promote">Promote</Link>
          </li>
          <li className={location.pathname === "/list" ? "active" : ""}>
            <Link to="/list">List</Link>
          </li>
        </ul>
        <button className="wallet-button" onClick={handleConnectWallet}>
          {walletStatus}
        </button>
      </div>
    </nav>
  );
};
