import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const tempAcc = await web3.eth.getAccounts();
        const accounts = tempAcc.length > 0 ? tempAcc : null;
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          redirect(contract);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);


  let redirect = async (contract) => {
    const path = window.location.pathname.split('/');
    if (path.length >= 2) {
      const short = path[1];
      if (short.length === 0) return;
      if (contract != null) {
        try {
          await contract.methods.getLink(short).call().then(value => {
            window.location.replace(value)
          });
        }catch (err){
          alert("Bad link");
        }
      }
    }
  }

  useEffect( () => {

    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Shortener.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };



    tryInit();

  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
