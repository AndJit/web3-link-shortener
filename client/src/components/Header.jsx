import useEth from "../contexts/EthContext/useEth";
import Web3 from "web3";

function Header() {

    const { state: { accounts } } = useEth();


    const connectWallet = async e => {
        if (accounts != null) return;
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        await web3.eth.requestAccounts();
    };

    return (
        <header>
            <div className="wallet-button" onClick={connectWallet}>{accounts != null ? accounts[0].slice(0,6) + "..." + accounts[0].slice(38) : "Connect Wallet" }</div>
        </header>
    );
}

export default Header;
