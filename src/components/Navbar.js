import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import "../styles/Navbar/navbar.scss";
import logo from "../components/stackchain.png";
import Popup from "./popup";
const Navbar = ({ setOpenWalletOption }) => {
  const cookie = new Cookies();
  const [address, setAddress] = useState(cookie.get("account"));
  const location = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();

  const networks = {
    bittorrent: {
      chainId: `0x${Number(1029).toString(16)}`,
      chainName: "BitTorrent Chain Donau",
      nativeCurrency: {
        name: "BTT",
        symbol: "BTT",
        decimals: 18,
      },
      rpcUrls: ["https://pre-rpc.bt.io/"],
      blockExplorerUrls: ["https://testscan.bt.io"],
    },
  };

  const changeNetwork = async ({ networkName, setError }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  useEffect(() => {
    const addr = cookie.get("account");
    if (addr) {
      setAddress(addr);
    }
  }, [cookie]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [newButton, setNewButton] = useState({ hidden: false });
  const onReClick = () => {
    setNewButton({ hidden: true });
  };

  return (
    <>
      <div className="navbar-main">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img className="nav-logo" src={logo} />
          </div>
        </div>
        <div className="navbar-middle">
          {/* <div className="searchbar">
            <input type="text" />
          </div> */}
        </div>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            <li className={window.location.pathname === "/" ? "active" : null}>
              <Link to="/">Home</Link>
            </li>
            <li
              className={window.location.pathname === "/info" ? "active" : null}
            >
              <Link to="/info">Crypto News</Link>
            </li>
            {address ? (
              <>
                <li
                  className={
                    window.location.pathname === "/ask-question"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/ask-question">Ask Question</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/find-question"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/find-question">All Questions</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/add-article"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/add-article">Add Article</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/message" ? "active" : null
                  }
                >
                  {/* <Link to="/message">Messages</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/find-profile"
                      ? "active"
                      : null
                  }
                > */}
                  <Link to="/find-profile">All Users</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/profile" ? "active" : null
                  }
                >
                  <Link to="profile">Profile</Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="connect-btn"
                  onClick={() => {
                    setOpenWalletOption(true);
                  }}
                >
                  Connect
                </button>
              </li>
            )}
            <li>
              <button className="connect-btn-i" onClick={togglePopup}>
                i
              </button>
              {isOpen && (
                <Popup
                  content={
                    <>
                      <div className="popup-div">
                        You need to connect with the BTTC Chain. If you are not
                        connected please connect using the button given below
                        and add BTTC Chain to Your Wallet.
                        <div>
                          <p
                            className="popup-text"
                            onClick={() =>
                              window.open("https://testfaucet.bt.io/#/")
                            }
                          >
                            Click for BTTC Faucet
                          </p>
                        </div>
                      </div>
                      <button
                        className="popup-btn"
                        onClick={() => {
                          onReClick();
                          handleNetworkSwitch("bittorrent");
                        }}
                      >
                        Add BTTC Chain and Connect
                      </button>
                    </>
                  }
                  handleClose={togglePopup}
                />
              )}
            </li>
          </ul>
          <button
            className="hamburger"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            {/* icon from Heroicons.com */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;